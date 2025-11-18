import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Save appointment booking to database
    Args: event with httpMethod, body
    Returns: HTTP response with success/error status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    full_name = body_data.get('full_name', '').strip()
    phone = body_data.get('phone', '').strip()
    email = body_data.get('email', '').strip()
    service_type = body_data.get('service_type', '').strip()
    preferred_date = body_data.get('preferred_date', '').strip()
    preferred_time = body_data.get('preferred_time', '').strip()
    additional_info = body_data.get('additional_info', '').strip()
    
    if not all([full_name, phone, service_type, preferred_date, preferred_time]):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Required fields are missing'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    cur.execute(
        """INSERT INTO appointments 
        (full_name, phone, email, service_type, preferred_date, preferred_time, additional_info, status) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, 'pending')""",
        (full_name, phone, email, service_type, preferred_date, preferred_time, additional_info)
    )
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Ваша запись успешно оформлена'}),
        'isBase64Encoded': False
    }
