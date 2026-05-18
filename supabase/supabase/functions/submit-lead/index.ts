import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_KEY    = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const EMAIL_TO      = "caicedoandres832@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, phone, area, message } = await req.json();

    // 1) Save to Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    const { error: dbError } = await supabase.from("leads").insert([{
      name, email, phone, area, message,
      created_at: new Date().toISOString(),
    }]);
    if (dbError) console.error("DB error:", dbError.message);

    // 2) Send email via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Team Abogados <onboarding@resend.dev>",
        to:   EMAIL_TO,
        subject: `Nuevo caso — ${area} — ${name}`,
        html: `
          <h2>Nuevo cliente — Team Abogados</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Nombre</b></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Teléfono</b></td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Área</b></td><td style="padding:8px;border:1px solid #ddd">${area}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Mensaje</b></td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
          </table>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errBody = await emailRes.text();
      console.error("Resend error:", errBody);
      return new Response(JSON.stringify({ success: false, error: errBody }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});