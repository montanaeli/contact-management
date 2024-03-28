import SimpleButton from "@/components/SimpleButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex items-center h-20 bg-purple-50">
          <SimpleButton text="Back" type={"back"} />
      </div>
      <div>{children}</div>
    </div>
  );
}
