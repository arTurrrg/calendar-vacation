import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function DescriptionInput() {
  const [isDescription, setIsDescription] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleButtonClick = () => {
    setIsDescription(true);
  };

  const handleInputBlur = () => {
    setIsDescription(false);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    setDescriptionValue(e.target.value);
  };

  return (
    <div className="w-full">
      {isDescription ? (
        <Textarea
          placeholder="Add location"
          value={descriptionValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          className="w-full resize-none border-b-2 border-b-[#1967D2] font-semibold focus:bg-[#F1F3F4] focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      ) : (
        <Button
          onClick={handleButtonClick}
          variant="ghost"
          className="w-full justify-start font-semibold text-[#666769] hover:text-[#666769]"
        >
          {descriptionValue || "Add description"}
        </Button>
      )}
    </div>
  );
}
