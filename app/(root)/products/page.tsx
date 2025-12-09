"use client";
import { useState, FC } from "react";

export interface TreeNodeData {
  label: string;
  children?: TreeNodeData[];
}

interface TreeNodeListProps {
  nodes: TreeNodeData[];
}

const data: TreeNodeData[] = [
  {
    label: "Electronics",
    children: [
      {
        label: "TV",
        children: [
          { label: "Samsung" },
          { label: "Apple" },
          { label: "Vision" },
          { label: "Walton" },
          { label: "Panasonnic" },
          { label: "LG" },
        ],
      },
      {
        label: "Fridge",
        children: [{ label: "LG" }, { label: "Bosch" }],
      },
      { label: "Oven" },
    ],
  },
  {
    label: "Accessories",
    children: [
      {
        label: "Necessaries",
        children: [{ label: "Pen" }, { label: "Paper" }, { label: "Ledger" }],
      },
      {
        label: "Utilities",
        children: [{ label: "Purse" }, { label: "File" }],
      },
    ],
  },
];

const TreeNodeList: FC<TreeNodeListProps> = ({ nodes }) => {
  return (
    <ul className="tree-list">
      {nodes.map((node, i) => (
        <TreeNode key={i} node={node} />
      ))}
    </ul>
  );
};

interface TreeNodeProps {
  node: TreeNodeData;
}

const TreeNode: FC<TreeNodeProps> = ({ node }) => {
  const [open, setOpen] = useState(true);

  return (
    <li className="tree-item">
      <div className="tree-row" onClick={() => setOpen(!open)}>
        {node.children ? (
          <span className="arrow">{open ? "▼" : "▶"}</span>
        ) : (
          <span className="dot">•</span>
        )}

        {node.label}
      </div>

      {node.children && open && <TreeNodeList nodes={node.children} />}
    </li>
  );
};

export default function SidebarTree() {
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        borderRight: "1px solid #ccc",
        background: "none",
        padding: "12px",
      }}
    >
      <h3 className="text-gray-800">Categories</h3>
      <TreeNodeList nodes={data} />
    </div>
  );
}
