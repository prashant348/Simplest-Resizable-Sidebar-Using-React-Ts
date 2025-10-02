
# React + TypeScript: Simplest Resizable Sidebar

This project demonstrates the **simplest, fully working resizable sidebar** in React + TypeScript, with zero glitches and no unnecessary complexity. No `useCallback`, no `useEffect`—just clean, readable, and bug-free code.

## Features

- **Resizable sidebar**: Drag the vertical handle to adjust the sidebar width.
- **TypeScript support**: All types are handled for safety and autocompletion.
- **No advanced React hooks**: Only `useState` and `useRef` are used.
- **No external dependencies**: Pure React and TypeScript.
- **Customizable**: Easily set min, max, and default sidebar widths.

## Usage

The main logic is in `src/App.tsx`:

```tsx
import React, { useState, useRef } from "react";

interface ResizableSidebarProps {
  defaultWidth?: number;
  maxWidth?: number;
  minWidth?: number;
  children: React.ReactNode;
}

const ResizableSidebar: React.FC<ResizableSidebarProps> = ({
  defaultWidth = 250,
  maxWidth = 400,
  minWidth = 100,
  children,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(defaultWidth);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const initialSidebarWidth = sidebarRef.current?.offsetWidth || defaultWidth;

    const doResize = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const newWidth = Math.min(Math.max(initialSidebarWidth + dx, minWidth), maxWidth);
      setSidebarWidth(newWidth);
    };
    const stopResizing = () => {
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResizing);
    };

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResizing);
  };

  return (
    <div className="app-container h-screen flex">
      <div
        ref={sidebarRef}
        className="sidebar"
        style={{
          width: sidebarWidth,
          minWidth: minWidth,
          maxWidth: maxWidth,
          backgroundColor: "#0f0f0f",
          borderRight: "1px solid #ccc",
          position: "relative",
          overflow: "auto",
        }}
      >
        {children}
      </div>
      <div
        className="resizer"
        onMouseDown={startResizing}
        style={{
          width: 5,
          cursor: "col-resize",
          backgroundColor: "#ddd",
          flexShrink: 0,
        }}
      />
      <div className="main-content-area" style={{ flexGrow: 1, padding: 20 }}>
        <h1>Main Content</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default ResizableSidebar;
```

## How it works

1. **Sidebar width is managed by state** (`useState`).
2. **Sidebar DOM node is referenced** with `useRef` for initial width.
3. **Mouse events** are used for resizing—no need for `useCallback` or `useEffect`.
4. **No glitches or bugs**: The sidebar resizes smoothly and is clamped between `minWidth` and `maxWidth`.

## Customization

- Change `defaultWidth`, `minWidth`, or `maxWidth` via props.
- Style the sidebar, resizer, or main content as you like.

## Example

```tsx
<ResizableSidebar defaultWidth={220} minWidth={120} maxWidth={350}>
  <div style={{ color: 'white', padding: 16 }}>Sidebar Content</div>
</ResizableSidebar>
```

## License

“This project is MIT licensed, feel free to use in your projects. If you found this helpful, consider giving a ⭐ on GitHub!”
