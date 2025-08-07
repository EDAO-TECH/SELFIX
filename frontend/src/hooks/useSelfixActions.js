import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";

export const useSelfixActions = () => {
  const { toast } = useToast();

  const handleHealthCheck = async () => {
    const { id } = toast({
      title: "🔬 Running Pre-Health Check...",
      description: "Please wait while we analyze your system's integrity.",
    });

    try {
      const { data, error } = await supabase.functions.invoke('pre-health-check');

      if (error) throw error;

      toast({
        id,
        variant: "default",
        title: "✅ Health Check Complete!",
        description: `Status: ${data.message}`,
        className: "bg-green-600 border-green-600 text-white",
      });

    } catch (error) {
      toast({
        id,
        variant: "destructive",
        title: "❌ Health Check Failed",
        description: error.message || "Could not connect to the healing service. Please try again.",
      });
    }
  };

  const handleStartHealing = async () => {
    const { id } = toast({
      title: "⚡ Initiating Healing Protocol...",
      description: "The autonomous healing engine is being activated.",
    });

    try {
      const { data, error } = await supabase.functions.invoke('start-healing');

      if (error) throw error;

      toast({
        id,
        variant: "default",
        title: "✅ Healing Initiated!",
        description: data.message,
        className: "bg-primary border-primary text-primary-foreground",
      });

    } catch (error) {
      toast({
        id,
        variant: "destructive",
        title: "❌ Healing Failed to Start",
        description: error.message || "Could not connect to the healing service. Please try again.",
      });
    }
  };

  return { handleHealthCheck, handleStartHealing };
};