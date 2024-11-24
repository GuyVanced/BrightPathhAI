"""
Services for roadmap generation and management.
This module contains the business logic for roadmap-related operations.
"""

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import os
import re
import json
import logging
import traceback
from peft import PeftModel
from django.conf import settings

logger = logging.getLogger(__name__)

class RoadmapGenerator:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.model_path = os.path.join(settings.BASE_DIR, '..', 'model')
        self.load_model()

    def load_model(self):
        """Load the fine-tuned model and tokenizer"""
        try:
            logger.info("Loading model and tokenizer...")
            # First load the base model
            base_model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
            base_model = AutoModelForCausalLM.from_pretrained(base_model_name)
            self.tokenizer = AutoTokenizer.from_pretrained(base_model_name)
            
            # Then load the LoRA adapter
            logger.info(f"Loading LoRA adapter from {self.model_path}")
            self.model = PeftModel.from_pretrained(base_model, self.model_path)
            self.model.eval()
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            logger.error(traceback.format_exc())
            raise

    def generate_roadmap(self, query, max_length=2048):
        """Generate a learning roadmap based on the query"""
        try:
            # Prepare the input
            prompt = f"Generate a detailed learning roadmap for: {query}\n\nRoadmap:"
            inputs = self.tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
            
            # Generate
            with torch.no_grad():
                outputs = self.model.generate(
                    input_ids=inputs["input_ids"],
                    attention_mask=inputs["attention_mask"],
                    max_length=max_length,
                    num_return_sequences=1,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=self.tokenizer.pad_token_id
                )
            
            # Decode and clean the output
            roadmap_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            roadmap_text = roadmap_text.replace(prompt, "").strip()
            
            # Parse the roadmap text into a structured format
            return self.parse_roadmap(roadmap_text)
        except Exception as e:
            logger.error(f"Error generating roadmap: {str(e)}")
            logger.error(traceback.format_exc())
            raise

    def parse_roadmap(self, roadmap_text):
        """Parse the generated roadmap text into a structured format"""
        try:
            # Split into sections
            sections = re.split(r'\n\s*\d+\.\s+', roadmap_text)
            sections = [s.strip() for s in sections if s.strip()]
            
            # Structure the roadmap
            structured_roadmap = {
                'nodes': [],
                'resources': [],
                'prerequisites': []
            }
            
            for i, section in enumerate(sections, 1):
                # Extract title and description
                lines = section.split('\n')
                title = lines[0].strip()
                description = '\n'.join(lines[1:]).strip()
                
                # Add to structured roadmap
                node = {
                    'id': i,
                    'title': title,
                    'description': description,
                    'order': i,
                    'dependencies': []
                }
                
                # Look for prerequisites in the description
                if 'prerequisite' in description.lower():
                    prereq_match = re.search(r'prerequisite[s]?:(.+?)(?:\n|$)', 
                                          description.lower())
                    if prereq_match:
                        prereqs = prereq_match.group(1).strip()
                        node['dependencies'] = [p.strip() for p in prereqs.split(',')]
                
                structured_roadmap['nodes'].append(node)
            
            return structured_roadmap
        except Exception as e:
            logger.error(f"Error parsing roadmap: {str(e)}")
            logger.error(traceback.format_exc())
            raise

# Initialize the model
roadmap_generator = RoadmapGenerator()
