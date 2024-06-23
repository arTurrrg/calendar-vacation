import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ButtonInput() {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    setIsInput(true);
  };

  const handleInputBlur = () => {
    setIsInput(false);
  };

  const handleInputChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full">
      {isInput ? (
        <Input
          type="text"
          placeholder="Add location"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          className="w-full border-b-2 border-b-[#1967D2] font-semibold focus:bg-[#F1F3F4] focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      ) : (
        <Button
          onClick={handleButtonClick}
          variant="ghost"
          className="w-full justify-start font-semibold text-[#666769] hover:text-[#666769]"
        >
          {inputValue || "Add location"}
        </Button>
      )}
    </div>
  );
}
