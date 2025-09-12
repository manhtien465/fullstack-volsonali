import DefaultLayout from "@/components/layout"
// import ScriptLoader from "@/components/script-loader"

export default function TopGame({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <DefaultLayout>
          {/* <ScriptLoader></ScriptLoader> */}
         {children}
        </DefaultLayout>
    </>
   
  )
}
