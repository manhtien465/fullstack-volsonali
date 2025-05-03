"use client"
import { memo, useMemo, lazy, Suspense } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { PageComponent } from "./page-builder-context"

// Basic components loaded directly (smaller components used frequently)
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"

// Dynamically import UI components for code splitting
const Button = dynamic(() => import("@/components/ui/button"), { ssr: true })
const Input = dynamic(() => import("@/components/ui/input"), { ssr: true })
const Textarea = dynamic(() => import("@/components/ui/textarea"), { ssr: true })
const Checkbox = dynamic(() => import("@/components/ui/checkbox"), { ssr: true })
const RadioGroup = dynamic(() => import("@/components/ui/radio-group").then(mod => mod.RadioGroup), { ssr: true })
const RadioGroupItem = dynamic(() => import("@/components/ui/radio-group").then(mod => mod.RadioGroupItem), { ssr: true })

// Group related components to reduce bundle splitting overhead
const CardComponents = dynamic(() => 
  import("@/components/ui/card").then(mod => ({
    Card: mod.Card,
    CardContent: mod.CardContent,
    CardDescription: mod.CardDescription,
    CardFooter: mod.CardFooter,
    CardHeader: mod.CardHeader,
    CardTitle: mod.CardTitle
  })), 
  { ssr: true }
)

// Complex components - lazy loaded
const TabsComponents = dynamic(() => 
  import("@/components/ui/tabs").then(mod => ({
    Tabs: mod.Tabs,
    TabsContent: mod.TabsContent,
    TabsList: mod.TabsList,
    TabsTrigger: mod.TabsTrigger
  })), 
  { ssr: true, loading: () => <div className="min-h-[100px] bg-gray-100 animate-pulse rounded" /> }
)

const AccordionComponents = dynamic(() => 
  import("@/components/ui/accordion").then(mod => ({
    Accordion: mod.Accordion,
    AccordionContent: mod.AccordionContent,
    AccordionItem: mod.AccordionItem,
    AccordionTrigger: mod.AccordionTrigger
  })), 
  { ssr: true, loading: () => <div className="min-h-[100px] bg-gray-100 animate-pulse rounded" /> }
)

const AlertComponents = dynamic(() => 
  import("@/components/ui/alert").then(mod => ({
    Alert: mod.Alert,
    AlertDescription: mod.AlertDescription,
    AlertTitle: mod.AlertTitle
  })), 
  { ssr: true }
)

const Badge = dynamic(() => import("@/components/ui/badge"), { ssr: true })

const AvatarComponents = dynamic(() => 
  import("@/components/ui/avatar").then(mod => ({
    Avatar: mod.Avatar,
    AvatarFallback: mod.AvatarFallback,
    AvatarImage: mod.AvatarImage
  })), 
  { ssr: true }
)

const TooltipComponents = dynamic(() => 
  import("@/components/ui/tooltip").then(mod => ({
    Tooltip: mod.Tooltip,
    TooltipContent: mod.TooltipContent,
    TooltipProvider: mod.TooltipProvider,
    TooltipTrigger: mod.TooltipTrigger
  })), 
  { ssr: true }
)

const DialogComponents = dynamic(() => 
  import("@/components/ui/dialog").then(mod => ({
    Dialog: mod.Dialog,
    DialogContent: mod.DialogContent,
    DialogDescription: mod.DialogDescription,
    DialogHeader: mod.DialogHeader,
    DialogTitle: mod.DialogTitle,
    DialogTrigger: mod.DialogTrigger
  })), 
  { ssr: false }
)

const PopoverComponents = dynamic(() => 
  import("@/components/ui/popover").then(mod => ({
    Popover: mod.Popover,
    PopoverContent: mod.PopoverContent,
    PopoverTrigger: mod.PopoverTrigger
  })), 
  { ssr: true }
)

const SelectComponents = dynamic(() => 
  import("@/components/ui/select").then(mod => ({
    Select: mod.Select,
    SelectContent: mod.SelectContent,
    SelectItem: mod.SelectItem,
    SelectTrigger: mod.SelectTrigger,
    SelectValue: mod.SelectValue
  })), 
  { ssr: true }
)

const Slider = dynamic(() => import("@/components/ui/slider"), { ssr: true })
const Toggle = dynamic(() => import("@/components/ui/toggle"), { ssr: true })

// Cache for dynamically loaded Lucide icons
const iconCache = new Map<string, any>();

// Helper function to dynamically import Lucide icons
const getIconComponent = async (iconName: string | undefined): Promise<React.ComponentType | null> => {
  if (!iconName) return null;
  
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName);
  }
  
  try {
    // Dynamically import just the specific icon needed
    const icon = await import(`lucide-react/${iconName}`).catch(() => 
      // Fallback to direct import if path-based import fails
      import('lucide-react').then(mod => ({ [iconName]: mod[iconName as keyof typeof mod] }))
    );
    
    const IconComponent = icon[iconName] || icon.default;
    if (IconComponent) {
      iconCache.set(iconName, IconComponent);
      return IconComponent;
    }
  } catch (error) {
    console.warn(`Failed to load icon: ${iconName}`);
  }
  
  return null;
}

// LucideIcon component with dynamic loading
const LucideIcon = memo(({ iconName, className, style }: { iconName?: string, className?: string, style?: React.CSSProperties }) => {
  const [Icon, setIcon] = React.useState<React.ComponentType | null>(null);
  
  React.useEffect(() => {
    if (iconName) {
      getIconComponent(iconName).then(setIcon);
    }
  }, [iconName]);
  
  if (!Icon) {
    // Return empty span while loading to maintain layout
    return <span className={className} style={style} />;
  }
  
  return <Icon className={className} style={style} />;
});

interface JsonPageRendererProps {
  __component: any,
  id: number,
  json: PageComponent[]
}

// Component map for lazy loading complex components
const LazyComponentMap = {
  container: ({ children, props, ...rest }: any) => (
    <div
      className={props.className}
      style={{
        ...props.style,
        display: "flex",
        flexDirection: props.flexDirection || "column",
        gap: `${props.gap || 4}px`,
        padding: `${props.padding || 4}px`,
        backgroundColor: props.backgroundColor || "",
        color: props.textColor || "",
      }}
      {...rest}
    >
      {children}
    </div>
  ),
  row: ({ children, props, ...rest }: any) => (
    <div
      className={props.className}
      style={{
        ...props.style,
        display: "flex",
        flexWrap: props.wrap ? "wrap" : "nowrap",
        justifyContent: props.justifyContent || "flex-start",
        alignItems: props.alignItems || "stretch",
        backgroundColor: props.backgroundColor || "",
        color: props.textColor || "",
      }}
      {...rest}
    >
      {children}
    </div>
  ),
  spacer: ({ props, ...rest }: any) => (
    <div
      className={props.className}
      style={{
        ...props.style,
        height: `${props.height || 4}px`,
      }}
      {...rest}
    />
  )
};

// Simple loading component for Suspense fallback
const ComponentLoader = ({ height = 100 }: { height?: number }) => (
  <div className="w-full animate-pulse bg-gray-100 rounded" style={{ height: `${height}px` }} />
);

export function JsonPageRenderer(data: JsonPageRendererProps) {
  const components = useMemo(() => {
    if (!data.json) return null;
    
    // We'll chunk the components for better performance
    return data.json.map((component) => (
      <Suspense key={component.id} fallback={<ComponentLoader height={150} />}>
        <MemoizedComponentRenderer component={component} />
      </Suspense>
    ));
  }, [data.json]);

  if (!components) return null;

  return (
    <section className="container flex flex-col items-center gap-10 pb-28 pt-20 sm:gap-14 md:flex-row">
      {components}
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

  // For simple layout components, use the lightweight map
  if (component.type in LazyComponentMap) {
    const SimpleComponent = LazyComponentMap[component.type as keyof typeof LazyComponentMap];
    return (
      <SimpleComponent
        props={component.props}
        children={component.children?.map((child: any) => (
          <MemoizedComponentRenderer key={child.id} component={child} />
        ))}
      />
    );
  }

  const renderComponentByType = () => {
    switch (component.type) {
      // Simple structural components are now handled by LazyComponentMap
      // These cases are no longer needed as they're handled earlier
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
              <MemoizedComponentRenderer key={child.id} component={child} />
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
            {component.props.icon && 
              <LucideIcon 
                iconName={component.props.icon} 
                className="inline-block mr-2 h-5 w-5" 
              />
            }
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
            {component.props.icon && 
              <LucideIcon 
                iconName={component.props.icon} 
                className="inline-block mr-2 h-4 w-4" 
              />
            }
            {component.props.text || "Paragraph text"}
          </p>
        )
      case "button":
        return (
          <Suspense fallback={<div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />}>
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
              {component.props.icon && 
                <LucideIcon 
                  iconName={component.props.icon} 
                  className="mr-2 h-4 w-4" 
                />
              }
              {component.props.text || "Button"}
            </Button>
          </Suspense>
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
          <Suspense fallback={<div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg" />}>
            {({ Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } = CardComponents) => (
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
                    {component.props.icon && 
                      <LucideIcon 
                        iconName={component.props.icon} 
                        className="inline-block mr-2 h-5 w-5" 
                      />
                    }
                    {component.props.title || "Card Title"}
                  </CardTitle>
                  {component.props.description && <CardDescription>{component.props.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  {component.children?.map((child:any) => (
                    <MemoizedComponentRenderer key={child.id} component={child} />
                  ))}
                </CardContent>
                {component.props.footer && <CardFooter>{component.props.footer}</CardFooter>}
              </Card>
            )}
          </Suspense>
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
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIiAvPjwvc3ZnPg=="
              priority={component.props.priority}
              sizes={component.props.sizes || "(max-width: 768px) 100vw, 50vw"}
            />
          </div>
        )
      case "divider":
        return <Separator className={component.props.className} style={component.props.style} />
      // Spacer is now handled by LazyComponentMap
      case "tabs":
        return (
          <Suspense fallback={<div className="w-full h-40 bg-gray-100 animate-pulse rounded" />}>
            {() => {
              const { Tabs, TabsList, TabsTrigger, TabsContent } = TabsComponents;
              const tabItems = component.props.items || [
                { value: "tab1", label: "Tab 1" },
                { value: "tab2", label: "Tab 2" }
              ];
              const defaultTabValue = component.props.defaultValue || "tab1";
              
              return (
                <Tabs
                  defaultValue={defaultTabValue}
                  className={component.props.className}
                  style={{
                    ...component.props.style,
                    backgroundColor: component.props.backgroundColor || "",
                    color: component.props.textColor || "",
                  }}
                >
                  <TabsList>
                    {tabItems.map((item: any, index: number) => (
                      <TabsTrigger key={index} value={item.value || `tab${index + 1}`}>
                        {item.label || `Tab ${index + 1}`}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {tabItems.map((item: any, index: number) => {
                    const tabChildren = component.children?.filter(
                      (child: any) => child.props.tabIndex === index
                    ) || [];
                    
                    return (
                      <TabsContent key={index} value={item.value || `tab${index + 1}`}>
                        {tabChildren.map((child: any) => (
                          <MemoizedComponentRenderer key={child.id} component={child} />
                        ))}
                      </TabsContent>
                    );
                  })}
                </Tabs>
              );
            }}
          </Suspense>
        )
      case "accordion":
        const accordionItems = component.props.items || [
          { title: "Accordion Item 1" },
          { title: "Accordion Item 2" }
        ];
        
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
            {accordionItems.map((item: any, index: number) => {
              const accordionChildren = component.children?.filter(
                (child: any) => child.props.accordionIndex === index
              ) || [];
              
              return (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    {accordionChildren.map((child: any) => (
                      <MemoizedComponentRenderer key={child.id} component={child} />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )
      case "alert":
        const AlertIcon = IconComponent || LucideIcons.AlertCircle;
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
            <AlertIcon className="h-4 w-4" />
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
                  <MemoizedComponentRenderer key={child.id} component={child} />
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
        const selectOptions = component.props.options || [
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" }
        ];
        
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
                {selectOptions.map((option: any, index: number) => (
                  <SelectItem key={index} value={option.value || `option-${index}`}>
                    {option.label}
                  </SelectItem>
                ))}
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

 nextProps.component.id &&
    prevProps.component.type === nextProps.component.type &&
    prevProps.component.visible === nextProps.component.visible &&
    prevProps.component.props === nextProps.component.props
  );
});