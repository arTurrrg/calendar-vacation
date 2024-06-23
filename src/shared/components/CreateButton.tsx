import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CalendarPlus2, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContentSection from "./ContentSection";
import { useSectionStore } from "./SelectionStore";

export default function CreateButton() {
  const { setActiveSection } = useSectionStore();

  return (
    <div>
      <div>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-2 w-[17vh] rounded-full p-6 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <div className="flex items-center gap-3">
                  <CalendarPlus2 className="mr-2 h-6 w-6" />
                  <span className="text-[15px] text-gray-600">Create</span>
                  <ChevronDown size={14} className="mt-1 text-gray-600" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-6 w-48">
              <DropdownMenuGroup>
                <Dialog>
                  <DialogTrigger asChild className="w-[100%]">
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start"
                      onClick={() => setActiveSection("Event")}
                    >
                      Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ContentSection />
                  </DialogContent>
                </Dialog>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <Dialog>
                  <DialogTrigger asChild className="w-[100%]">
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start"
                      onClick={() => setActiveSection("Task")}
                    >
                      Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ContentSection />
                  </DialogContent>
                </Dialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </div>
    </div>
  );
}
