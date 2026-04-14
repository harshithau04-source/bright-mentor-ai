import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { type, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "coding") {
      const { question, code, language, category } = data;
      systemPrompt = `You are an expert coding interviewer evaluating ${category.toUpperCase()} solutions. Grade the code on correctness, efficiency, and code quality. Return a JSON object with: score (0-10), feedback (string with detailed review), correctness (boolean), suggestions (array of improvement strings).`;
      userPrompt = `Question: ${question}\nLanguage: ${language}\n\nCandidate's Code:\n\`\`\`${language}\n${code}\n\`\`\`\n\nEvaluate this solution.`;
    } else if (type === "hr") {
      const { question, answer, category } = data;
      systemPrompt = `You are an expert HR interviewer evaluating behavioral interview responses. Grade the answer on clarity, relevance, depth, and communication. Return a JSON object with: score (0-10), feedback (string with detailed review), strengths (array of strings), improvements (array of strings).`;
      userPrompt = `Question: ${question}\nCategory: ${category}\n\nCandidate's Answer:\n${answer}\n\nEvaluate this response.`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid evaluation type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: type === "coding" ? "evaluate_code" : "evaluate_hr",
              description: type === "coding" ? "Evaluate a coding solution" : "Evaluate an HR interview response",
              parameters: type === "coding"
                ? {
                    type: "object",
                    properties: {
                      score: { type: "number", description: "Score from 0 to 10" },
                      feedback: { type: "string", description: "Detailed review" },
                      correctness: { type: "boolean" },
                      suggestions: { type: "array", items: { type: "string" } },
                    },
                    required: ["score", "feedback", "correctness", "suggestions"],
                    additionalProperties: false,
                  }
                : {
                    type: "object",
                    properties: {
                      score: { type: "number", description: "Score from 0 to 10" },
                      feedback: { type: "string", description: "Detailed review" },
                      strengths: { type: "array", items: { type: "string" } },
                      improvements: { type: "array", items: { type: "string" } },
                    },
                    required: ["score", "feedback", "strengths", "improvements"],
                    additionalProperties: false,
                  },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: type === "coding" ? "evaluate_code" : "evaluate_hr" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI evaluation failed");
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    const evaluation = toolCall ? JSON.parse(toolCall.function.arguments) : null;

    return new Response(JSON.stringify({ evaluation }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("evaluate error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
