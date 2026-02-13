import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Image
            src="/logo.png"
            alt="Shkolla ne Mikrofon logo"
            width={28}
            height={28}
            className="sm:w-8 sm:h-8"
            />
          <span className="text-sm">Shkolla në Mikrofon</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {"©2026. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
