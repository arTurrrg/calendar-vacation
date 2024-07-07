import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Clock4, MapPin, Menu } from "lucide-react";
import { useSectionStore } from "@/shared/components/SelectionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import ButtonInput from "./ButtonInput";
import DescriptionInput from "./DescriptionInput";

export default function ContentSection() {
  const { activeSection, setActiveSection } = useSectionStore();
  const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const getSectionStyle = (section: string) => {
    if (section === activeSection) {
      return "bg-[#E8F0FE] text-[#3277D7] hover:bg-[#E0ECFD]";
    }
    return "text-[#5F6368] hover:text-[#5F6368] hover:bg-[#F5F5F5]";
  };

  return (
    <>
      <DialogHeader>
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Add Title"
            className="w-5/6 border-b-2 border-gray-300 pb-2 text-xl font-semibold focus:border-blue-700 focus:outline-none"
          />
        </div>
      </DialogHeader>
      <div className="mb-4 flex justify-center space-x-2">
        <Button
          variant={activeSection === "Event" ? "default" : "ghost"}
          onClick={() => setActiveSection("Event")}
          className={`${getSectionStyle("Event")}`}
        >
          Event
        </Button>
        <Button
          variant={activeSection === "Task" ? "default" : "ghost"}
          onClick={() => setActiveSection("Task")}
          className={`${getSectionStyle("Task")}`}
        >
          Task
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="h-[200px]">
            {activeSection === "Event" && (
              <div className="space-y-3">
                <div className="flex items-center gap-5">
                  <Clock4 className="ml-6 text-[#5F6368]" />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "justify-start font-semibold",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {format(
                                  field.value || new Date(),
                                  "EEEE, MMM d"
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value || new Date()}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <MapPin className="ml-6 text-[#5F6368]" />
                  <ButtonInput />
                </div>
                <div className="flex items-center gap-5">
                  <Menu className="ml-6 text-[#5F6368]" />
                  <DescriptionInput />
                </div>
              </div>
            )}

            {activeSection === "Task" && (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Clock4 className="ml-6 text-[#5F6368]" />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start font-semibold",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {format(
                                  field.value || new Date(),
                                  "EEEE, MMM d"
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value || new Date()}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-5">
                  <Menu className="ml-6 mt-2 text-[#5F6368]" />
                  <Textarea
                    placeholder="Add Description"
                    className="resize-none bg-[#F1F3F4] hover:bg-[#E3E5E6] focus:bg-[#F1F3F4] focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="mt-4 w-1/5 bg-[#1A73E8] hover:bg-[#1B66C9]"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
