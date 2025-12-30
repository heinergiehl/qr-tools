import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  items: FaqItem[];
};

export const Faq = ({ items }: FaqProps) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((item, index) => (
      <AccordionItem key={item.question} value={`faq-${index}`}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
