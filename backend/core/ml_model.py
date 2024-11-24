import os
import numpy as np
from transformers import pipeline
from django.conf import settings

def load_model():
    """Load the ML model and tokenizer."""
    try:
        model_path = os.path.join(settings.MODEL_PATH, 'model')
        tokenizer_path = os.path.join(settings.MODEL_PATH, 'tokenizer')
        
        # Initialize the question-answering pipeline
        qa_pipeline = pipeline(
            "question-answering",
            model=model_path,
            tokenizer=tokenizer_path
        )
        return qa_pipeline
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

def process_query(query):
    """Process a user query and return an appropriate response."""
    try:
        qa_pipeline = load_model()
        if not qa_pipeline:
            return "Sorry, I'm having trouble accessing my knowledge base right now."
        
        # Process the query using the model
        context = "BrightPath is a learning platform that helps users create personalized learning paths based on their career goals and interests. It provides role-based and skill-based roadmaps, interactive exercises, and AI assistance."
        
        result = qa_pipeline(question=query, context=context)
        
        return result['answer']
    except Exception as e:
        print(f"Error processing query: {str(e)}")
        return "I apologize, but I encountered an error while processing your query."

def generate_learning_path(role=None, skills=None):
    """Generate a personalized learning path based on role or skills."""
    try:
        if role:
            # Generate role-based learning path
            required_skills = role.required_skills.all()
            path = {
                'title': f"Learning Path for {role.name}",
                'description': role.description,
                'skills': [
                    {
                        'name': skill.name,
                        'description': skill.description,
                        'category': skill.category
                    }
                    for skill in required_skills
                ]
            }
        elif skills:
            # Generate skills-based learning path
            path = {
                'title': "Custom Learning Path",
                'description': "Personalized learning path based on selected skills",
                'skills': [
                    {
                        'name': skill.name,
                        'description': skill.description,
                        'category': skill.category
                    }
                    for skill in skills
                ]
            }
        else:
            raise ValueError("Either role or skills must be provided")
        
        return path
    except Exception as e:
        print(f"Error generating learning path: {str(e)}")
        return None
