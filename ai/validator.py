from orchestrator import ai_agent
import openai
import json

@ai_agent("validator")
async def validator_agent(data, snapshot):
    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system", "content": f"You are the Validator AI.\n\nSnapshot:\n{json.dumps(snapshot)}\n\nValidate that lessons match schedules, unit boundaries, and calendar. Return {{ table_updates, trigger, message }}"}
        ]
    )
    return json.loads(response['choices'][0]['message']['content'])
