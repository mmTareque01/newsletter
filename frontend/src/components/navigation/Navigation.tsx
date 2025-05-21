"use client";
import { NavItem } from "@/constants/nav";
import { useAppSettings } from "@/stores/app-settings-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Navigation({
  items,
  menuType,
}: {
  items: NavItem[];
  menuType: "main" | "others";
}) {
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );

  const { expandedSidebar } = useAppSettings();
  const pathname = usePathname();
  const isActive = useCallback((path: string) => pathname === path, [pathname]);
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  // useEffect(() => {
  //   let submenuMatched = false;
  //   ["main", "others"].forEach((menuType) => {
  //     const items = menuType === "main" ? navItems : othersItems;
  //     items.forEach((nav, index) => {
  //       if (nav.subItems) {
  //         nav.subItems.forEach((subItem) => {
  //           if (isActive(subItem.path)) {
  //             setOpenSubmenu({
  //               type: menuType as "main" | "others",
  //               index,
  //             });
  //             submenuMatched = true;
  //           }
  //         });
  //       }
  //     });
  //   });

  //   if (!submenuMatched) {
  //     setOpenSubmenu(null);
  //   }
  // }, [pathname, isActive]);

  return (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group flex items-center gap-2 w-full px-4 py-2 transition-colors ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer
               ${!expandedSidebar ? "lg:justify-center" : "lg:justify-start"}
              `}
            >
              {/* ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              } */}

              {/* Icon */}
              <span
                className={`menu-item-icon-size flex items-center justify-center ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>

              {/* Label */}
              {expandedSidebar && (
                <span className="menu-item-text whitespace-nowrap">
                  {nav.name}
                </span>
              )}

              {/* {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text whitespace-nowrap">
                  {nav.name}
                </span>
              )} */}

              {/* Chevron */}
              {expandedSidebar && (
                <FaChevronDown
                  className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}

              {/* {(isExpanded || isHovered || isMobileOpen) && (
                <FaChevronDown
                  className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )} */}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path ?? "#"}
                className={`menu-item group flex items-center gap-2 w-full px-4 py-2 transition-colors duration-200 ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                } 
                ${!expandedSidebar ? "lg:justify-center" : "lg:justify-start"}
            `}
              >
                {/* ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                
            } */}

                {/* Icon */}
                <span
                  className={`menu-item-icon-size flex items-center justify-center ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {/* Label */}
                {expandedSidebar && (
                  <span className="menu-item-text whitespace-nowrap">
                    {nav.name}
                  </span>
                )}
                {/* {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text whitespace-nowrap">
                    {nav.name}
                  </span>
                )} */}
              </Link>
            )
          )}
          {nav.subItems &&
            expandedSidebar && ( //isExpanded || isHovered || isMobileOpen
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? `${subMenuHeight[`${menuType}-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        {subItem.name}
                        <span className="flex items-center gap-1 ml-auto">
                          {subItem.new && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              new
                            </span>
                          )}
                          {subItem.pro && (
                            <span
                              className={`ml-auto ${
                                isActive(subItem.path)
                                  ? "menu-dropdown-badge-active"
                                  : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                            >
                              pro
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </li>
      ))}
    </ul>
  );
}
