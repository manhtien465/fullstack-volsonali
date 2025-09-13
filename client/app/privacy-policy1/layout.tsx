import DefaultLayout from "@/components/layout"

export default function TopGame({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <DefaultLayout>
         {children}
        </DefaultLayout>
    </>
   
  )
}
