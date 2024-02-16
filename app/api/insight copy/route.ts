import { Insight } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase.from("kpu_tps_data-error-1").select();
  const kpuTpsErrorData: Insight = data !== null ? data[0] : null;
  // let dataArray: User[] = [];
  console.log(kpuTpsErrorData);

  return Response.json({ data });
}
