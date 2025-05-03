"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import * as LucideIcons from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { PageComponent } from "./page-builder-context"

interface JsonPageRendererProps {
  __component: any,
   id: number,
  json: PageComponent[]
}

export function JsonPageRenderer(data: JsonPageRendererProps) {
  if (!data.json ) return null;

  return (
    <section className="container flex flex-col items-center gap-10 pb-28 pt-20 sm:gap-14 md:flex-row">
      {data.json.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </section>
  )
}

interface ComponentRendererProps {
  component: PageComponent
}

function ComponentRenderer({ component }: ComponentRendererProps) {
  // Don't render if component is not visible
  if (!component.visible) {
    return null
  }

  // Get the icon component if specified
  const IconComponent = component.props.icon ? (LucideIcons as any)[component.props.icon] : null

  const renderComponentByType = () => {
    switch (component.type) {
      case "container":
        return (
          <div
            className={component.props.className}
            style={{
              ...component.props.style,
              display: "flex",
              flexDirection: component.props.flexDirection || "column",
              gap: `${component.props.gap || 4}px`,
              padding: `${component.props.padding || 4}px`,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {component.children?.map((child:any) => (
              <ComponentRenderer key={child.id} component={child} />
            ))}
          </div>
        )
      case "row":
        return (
          <div
            className={component.props.className}
            style={{
              ...component.props.style,
              display: "flex",
              flexWrap: component.props.wrap ? "wrap" : "nowrap",
              justifyContent: component.props.justifyContent || "flex-start",
              alignItems: component.props.alignItems || "stretch",
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {component.children?.map((child:any) => (
              <ComponentRenderer key={child.id} component={child} />
            ))}
          </div>
        )
      case "column":
        return (
          <div
            className={component.props.className}
            style={{
              ...component.props.style,
              flexGrow: component.props.grow ? 1 : 0,
              flexShrink: component.props.shrink ? 1 : 0,
              width: component.props.width !== "auto" ? component.props.width : undefined,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {component.children?.map((child:any) => (
              <ComponentRenderer key={child.id} component={child} />
            ))}
          </div>
        )
      case "heading":
        const HeadingTag = component.props.level || "h2"
        return (
          <HeadingTag
            className={component.props.className}
            style={{
              ...component.props.style,
              textAlign: component.props.align || "left",
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {IconComponent && <IconComponent className="inline-block mr-2 h-5 w-5" />}
            {component.props.text || "Heading"}
          </HeadingTag>
        )
      case "paragraph":
        return (
          <p
            className={component.props.className}
            style={{
              ...component.props.style,
              textAlign: component.props.align || "left",
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {IconComponent && <IconComponent className="inline-block mr-2 h-4 w-4" />}
            {component.props.text || "Paragraph text"}
          </p>
        )
      case "button":
        return (
          <Button
            variant={(component.props.variant as any) || "default"}
            size={(component.props.size as any) || "default"}
            className={component.props.className}
            style={{
              ...component.props.style,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
            {component.props.text || "Button"}
          </Button>
        )
      case "input":
        return (
          <div className="space-y-2">
            {component.props.label && <Label htmlFor={`input-${component.id}`}>{component.props.label}</Label>}
            <Input
              id={`input-${component.id}`}
              type={component.props.type || "text"}
              placeholder={component.props.placeholder || ""}
              className={component.props.className}
              style={{
                ...component.props.style,
                backgroundColor: component.props.backgroundColor || "",
                color: component.props.textColor || "",
              }}
            />
          </div>
        )
      case "textarea":
        return (
          <div className="space-y-2">
            {component.props.label && <Label htmlFor={`textarea-${component.id}`}>{component.props.label}</Label>}
            <Textarea
              id={`textarea-${component.id}`}
              placeholder={component.props.placeholder || ""}
              rows={component.props.rows || 4}
              className={component.props.className}
              style={{
                ...component.props.style,
                backgroundColor: component.props.backgroundColor || "",
                color: component.props.textColor || "",
              }}
            />
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={`checkbox-${component.id}`} />
            <Label htmlFor={`checkbox-${component.id}`}>{component.props.label || "Checkbox"}</Label>
          </div>
        )
      case "radio":
        return (
          <RadioGroup defaultValue={component.props.value || "option"}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={component.props.value || "option"} id={`radio-${component.id}`} />
              <Label htmlFor={`radio-${component.id}`}>{component.props.label || "Radio option"}</Label>
            </div>
          </RadioGroup>
        )
      case "card":
        return (
          <Card
            className={component.props.className}
            style={{
              ...component.props.style,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            <CardHeader>
              <CardTitle>
                {IconComponent && <IconComponent className="inline-block mr-2 h-5 w-5" />}
                {component.props.title || "Card Title"}
              </CardTitle>
              {component.props.description && <CardDescription>{component.props.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              {component.children?.map((child:any) => (
                <ComponentRenderer key={child.id} component={child} />
              ))}
            </CardContent>
            {component.props.footer && <CardFooter>{component.props.footer}</CardFooter>}
          </Card>
        )
      case "image":
        return (
          <div>
            <Image
              src={component.props.src || "/placeholder.svg?height=200&width=400"}
              alt={component.props.alt || "Image"}
              width={component.props.width || 400}
              height={component.props.height || 200}
              className={cn(component.props.className, "object-cover")}
              style={component.props.style}
            />
          </div>
        )
      case "divider":
        return <Separator className={component.props.className} style={component.props.style} />
      case "spacer":
        return (
          <div
            className={component.props.className}
            style={{
              ...component.props.style,
              height: `${component.props.height || 4}px`,
            }}
          />
        )
      case "tabs":
        return (
          <Tabs
            defaultValue={component.props.defaultValue || "tab1"}
            className={component.props.className}
            style={{
              ...component.props.style,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            <TabsList>
              {component.props.items?.map((item: any, index: number) => (
                <TabsTrigger key={index} value={item.value || `tab${index + 1}`}>
                  {item.label || `Tab ${index + 1}`}
                </TabsTrigger>
              )) || (
                <>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </>
              )}
            </TabsList>
            {component.props.items?.map((item: any, index: number) => (
              <TabsContent key={index} value={item.value || `tab${index + 1}`}>
                {component.children
                  ?.filter((child:any) => child.props.tabIndex === index)
                  .map((child:any) => (
                    <ComponentRenderer key={child.id} component={child} />
                  ))}
              </TabsContent>
            )) || (
              <>
                <TabsContent value="tab1">
                  {component.children
                    ?.filter((child:any) => !child.props.tabIndex || child.props.tabIndex === 0)
                    .map((child:any) => (
                      <ComponentRenderer key={child.id} component={child} />
                    ))}
                </TabsContent>
                <TabsContent value="tab2">
                  {component.children
                    ?.filter((child:any) => child.props.tabIndex === 1)
                    .map((child:any) => (
                      <ComponentRenderer key={child.id} component={child} />
                    ))}
                </TabsContent>
              </>
            )}
          </Tabs>
        )
      case "accordion":
        return (
          <Accordion
            type={component.props.type || "single"}
            collapsible
            className={component.props.className}
            style={{
              ...component.props.style,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {component.props.items?.map((item: any, index: number) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                  {component.children
                    ?.filter((child:any) => child.props.accordionIndex === index)
                    .map((child:any) => (
                      <ComponentRenderer key={child.id} component={child} />
                    ))}
                </AccordionContent>
              </AccordionItem>
            )) || (
              <>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Accordion Item 1</AccordionTrigger>
                  <AccordionContent>
                    {component.children
                      ?.filter((child:any) => !child.props.accordionIndex || child.props.accordionIndex === 0)
                      .map((child:any) => (
                        <ComponentRenderer key={child.id} component={child} />
                      ))}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Accordion Item 2</AccordionTrigger>
                  <AccordionContent>
                    {component.children
                      ?.filter((child:any) => child.props.accordionIndex === 1)
                      .map((child:any) => (
                        <ComponentRenderer key={child.id} component={child} />
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </>
            )}
          </Accordion>
        )
      case "alert":
        return (
          <Alert
            variant={(component.props.variant as any) || "default"}
            className={component.props.className}
            style={{
              ...component.props.style,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {IconComponent ? <IconComponent className="h-4 w-4" /> : <LucideIcons.AlertCircle className="h-4 w-4" />}
            <AlertTitle>{component.props.title || "Alert Title"}</AlertTitle>
            <AlertDescription>{component.props.description || "Alert description"}</AlertDescription>
          </Alert>
        )
      case "badge":
        return (
          <Badge
            variant={(component.props.variant as any) || "default"}
            className={component.props.className}
            style={{
              ...component.props.style,
              backgroundColor: component.props.backgroundColor || "",
              color: component.props.textColor || "",
            }}
          >
            {IconComponent && <IconComponent className="inline-block mr-1 h-3 w-3" />}
            {component.props.text || "Badge"}
          </Badge>
        )
      case "avatar":
        return (
          <Avatar className={component.props.className} style={component.props.style}>
            <AvatarImage src={component.props.src || "/placeholder.svg"} alt={component.props.alt || "Avatar"} />
            <AvatarFallback>{component.props.fallback || "U"}</AvatarFallback>
          </Avatar>
        )
      case "tooltip":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {IconComponent && <IconComponent className="inline-block mr-1 h-4 w-4" />}
                {component.props.trigger || "Hover me"}
              </TooltipTrigger>
              <TooltipContent
                className={component.props.className}
                style={{
                  ...component.props.style,
                  backgroundColor: component.props.backgroundColor || "",
                  color: component.props.textColor || "",
                }}
              >
                {component.props.content || "Tooltip content"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      case "dialog":
        return (
          <Dialog>
            <DialogTrigger
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
              )}
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {component.props.trigger || "Open Dialog"}
            </DialogTrigger>
            <DialogContent
              className={component.props.className}
              style={{
                ...component.props.style,
                backgroundColor: component.props.backgroundColor || "",
                color: component.props.textColor || "",
              }}
            >
              <DialogHeader>
                <DialogTitle>{component.props.title || "Dialog Title"}</DialogTitle>
                <DialogDescription>{component.props.description || "Dialog description"}</DialogDescription>
              </DialogHeader>
              <div>
                {component.children?.map((child:any) => (
                  <ComponentRenderer key={child.id} component={child} />
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )
      case "popover":
        return (
          <Popover>
            <PopoverTrigger
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
              )}
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {component.props.trigger || "Click me"}
            </PopoverTrigger>
            <PopoverContent
              className={component.props.className}
              style={{
                ...component.props.style,
                backgroundColor: component.props.backgroundColor || "",
                color: component.props.textColor || "",
              }}
            >
              {component.props.content || "Popover content"}
            </PopoverContent>
          </Popover>
        )
      case "select":
        return (
          <div className="space-y-2">
            {component.props.label && <Label>{component.props.label}</Label>}
            <Select>
              <SelectTrigger
                className={component.props.className}
                style={{
                  ...component.props.style,
                  backgroundColor: component.props.backgroundColor || "",
                  color: component.props.textColor || "",
                }}
              >
                <SelectValue placeholder={component.props.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {component.props.options?.map((option: any, index: number) => (
                  <SelectItem key={index} value={option.value || `option-${index}`}>
                    {option.label}
                  </SelectItem>
                )) || (
                  <>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        )
      case "slider":
        return (
          <div className="space-y-2">
            {component.props.label && <Label>{component.props.label}</Label>}
            <Slider
              defaultValue={[component.props.defaultValue || 50]}
              min={component.props.min || 0}
              max={component.props.max || 100}
              step={component.props.step || 1}
              className={component.props.className}
              style={{
                ...component.props.style,
                backgroundColor: component.props.backgroundColor || "",
                color: component.props.textColor || "",
              }}
            />
          </div>
        )
      case "toggle":
        return (
          <div className="space-y-2">
            <Toggle
              defaultPressed={component.props.defaultPressed}
              className={component.props.className}
              style={{
                ...component.props.style,
                backgroundColor: component.props.backgroundColor || "",
                color: component.props.textColor || "",
              }}
            >
              {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
              {component.props.label || "Toggle"}
            </Toggle>
          </div>
        )
      case "icon":
        if (IconComponent) {
          return (
            <div>
              <IconComponent
                className={cn(component.props.className, "h-6 w-6")}
                style={{
                  ...component.props.style,
                  color: component.props.color || "",
                }}
              />
            </div>
          )
        }
        return null
      default:
        return <div>Unknown component type: {component.type}</div>
    }
  }

  return renderComponentByType()
}
