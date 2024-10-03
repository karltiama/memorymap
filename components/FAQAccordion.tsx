import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQAccordion() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-800 dark:text-gray-200">How do I create a new memory on the map?</AccordionTrigger>
          <AccordionContent className="text-gray-700 dark:text-gray-300">
            To create a new memory, simply click on the map at the location you want to add the memory. A popup will appear where you can enter details about your memory, including title, description, and the option to upload photos.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I upload multiple photos for a single memory?</AccordionTrigger>
          <AccordionContent>
            Yes! You can upload multiple photos for each memory. When creating or editing a memory, you'll see an option to add photos. You can select multiple files at once or add them one by one.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I share my memories with friends and family?</AccordionTrigger>
          <AccordionContent>
            Sharing is easy! You have two options: 1) You can invite friends and family directly through the app by entering their email addresses. They'll receive an invitation to view your memory map. 2) You can also generate a shareable link that you can send via email, message, or social media.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Is there a limit to how many memories I can create?</AccordionTrigger>
          <AccordionContent>
            There's no limit to the number of memories you can create! Our goal is to help you capture and preserve as many special moments as you'd like. However, there may be storage limits for photos depending on your account type.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Can I edit or delete a memory after I've created it?</AccordionTrigger>
          <AccordionContent>
            You can edit or delete any memory you've created at any time. Simply click on the memory marker on the map, and you'll see options to edit or delete the memory. This allows you to keep your memories up-to-date or remove any you no longer want to keep.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}