from orchestrator import ai_agent
import openai
import json

@ai_agent("fun_ai")
async def fun_ai(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Fun AI.\n\nSnapshot:\n{json.dumps(snapshot)}\n\nSuggest fun activities based on students.interests. Return {{ message, trigger, table_updates }}"}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
