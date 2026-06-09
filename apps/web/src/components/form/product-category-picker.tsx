'use client';

import { ChevronDown, Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { type LibraryNode, useCategories } from '@/stores/categories-store';

type ProductCategoryPickerProps = {
  value: string;
  onValueChange: (categoryId: string) => void;
};

function containsCategoryId(node: LibraryNode, categoryId: string): boolean {
  if (!categoryId) return false;
  if (node.id === categoryId) return true;
  return node.children.some((child) => containsCategoryId(child, categoryId));
}

function findCategoryPath(
  nodes: LibraryNode[],
  categoryId: string,
  trail: string[] = [],
): string[] | null {
  for (const node of nodes) {
    const nextTrail = [...trail, node.name];
    if (node.id === categoryId) return nextTrail;
    const inChild = findCategoryPath(node.children, categoryId, nextTrail);
    if (inChild) return inChild;
  }
  return null;
}

function CategoryTreeNode({
  node,
  depth,
  value,
  onValueChange,
}: {
  node: LibraryNode;
  depth: number;
  value: string;
  onValueChange: (categoryId: string) => void;
}) {
  const hasChildren = node.children.length > 0;
  const isSelected = value === node.id;
  const openByDefault = containsCategoryId(node, value);

  if (!hasChildren) {
    return (
      <button
        type="button"
        onClick={() => onValueChange(node.id)}
        className={cn(
          'hover:bg-muted/70 w-full rounded-sm py-2 text-start text-sm transition-colors',
          isSelected && 'bg-primary/10 text-primary font-medium',
        )}
        style={{ paddingRight: `${depth * 14 + 12}px`, paddingLeft: '12px' }}
      >
        {node.name}
      </button>
    );
  }

  return (
    <Collapsible defaultOpen={openByDefault} className="group/category-node">
      <CollapsibleTrigger
        type="button"
        className={cn(
          'hover:bg-muted/50 flex w-full items-center justify-between rounded-sm py-2 text-start text-sm font-medium',
        )}
        style={{ paddingRight: `${depth * 14 + 12}px`, paddingLeft: '12px' }}
      >
        <span>{node.name}</span>
        <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform group-data-[state=open]/category-node:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-0.5 pb-1">
        {node.children.map((child) => (
          <CategoryTreeNode
            key={child.id}
            node={child}
            depth={depth + 1}
            value={value}
            onValueChange={onValueChange}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ProductCategoryPicker({ value, onValueChange }: ProductCategoryPickerProps) {
  const { libraries, loading } = useCategories();

  const partLibraries = useMemo(
    () => libraries.filter((library) => library.kind === 'PART'),
    [libraries],
  );

  const selectedPath = useMemo(() => {
    if (!value) return null;
    for (const library of partLibraries) {
      const path = findCategoryPath(library.children, value);
      if (path) return [library.name, ...path];
    }
    return null;
  }, [value, partLibraries]);

  if (loading) {
    return (
      <div className="text-muted-foreground flex items-center gap-2 rounded-md border px-3 py-6 text-sm">
        <Loader2 className="size-4 animate-spin" />
        در حال بارگذاری دسته‌بندی‌ها...
      </div>
    );
  }

  if (partLibraries.length === 0) {
    return (
      <p className="text-muted-foreground rounded-md border px-3 py-4 text-sm">
        دسته‌بندی‌ای یافت نشد
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {selectedPath ? (
        <p className="text-muted-foreground text-xs">
          انتخاب شده:{' '}
          <span className="text-foreground font-medium">{selectedPath.join(' › ')}</span>
        </p>
      ) : (
        <p className="text-muted-foreground text-xs">یک دسته از گروه‌ها انتخاب کنید</p>
      )}

      <div className="space-y-2">
        {partLibraries.map((library) => (
          <Collapsible
            key={library.id}
            defaultOpen={containsCategoryId(library, value) || partLibraries.length === 1}
            className="group/library rounded-md border"
          >
            <CollapsibleTrigger
              type="button"
              className="hover:bg-muted/40 flex w-full items-center justify-between px-3 py-2.5 text-sm font-semibold"
            >
              <span>{library.name}</span>
              <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform group-data-[state=open]/library:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="border-t px-1 py-2">
              {library.children.length === 0 ? (
                <p className="text-muted-foreground px-3 py-2 text-xs">زیردسته‌ای ثبت نشده</p>
              ) : (
                library.children.map((node) => (
                  <CategoryTreeNode
                    key={node.id}
                    node={node}
                    depth={0}
                    value={value}
                    onValueChange={onValueChange}
                  />
                ))
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
