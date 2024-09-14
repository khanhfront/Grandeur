import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavSectionItem } from "./nav_section_item";
import { Icons } from "@/components/icons";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
interface NavSectionProps {
  section: NavSection;
  path: string;
  isMinimized: boolean;
}

export function NavSection({ section, path, isMinimized }: NavSectionProps) {
  const IconComponent =
    Icons[section.icon as keyof typeof Icons] || Icons["arrowRight"];
  const hasMultipleItems = section.items.length > 1;

  return (
    <div>
      {hasMultipleItems ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={section.title}>
            <AccordionTrigger>
              <div className="flex items-center gap-2 pl-1">
                <IconComponent className="size-5" />
                <span
                  className={`mr-2 truncate transition-opacity duration-500 ${
                    !isMinimized ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {!isMinimized ? section.title : ""}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {section.items.map((item, index) => (
                <NavSectionItem
                  key={index}
                  item={item}
                  path={path}
                  isMinimized={isMinimized}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        section.items.map((item, index) => (
          <div key={index}>
            <NavSectionItem item={item} path={path} isMinimized={isMinimized} />
            <Separator />
          </div>
        ))
      )}
    </div>
  );
}
