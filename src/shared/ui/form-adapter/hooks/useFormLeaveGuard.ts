"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";

export function useFormLeaveGuard(isDirty: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleWindowClose = useCallback(
    (e: BeforeUnloadEvent) => {
      if (!isDirty) return;

      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    },
    [isDirty],
  );

  const handleBrowseAway = useCallback(() => {
    if (!isDirty) return;

    const confirmLeave = window.confirm("are you sure?");

    if (!confirmLeave) {
      return "Route change aborted";
    }
  }, [isDirty]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleWindowClose);

    const currentPath = `${pathname}?${searchParams}`;

    const handleRouteChange = () => {
      const newPath = `${pathname}?${searchParams}`;
      if (newPath !== currentPath) {
        handleBrowseAway();
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [isDirty, pathname, searchParams, handleWindowClose, handleBrowseAway]);

  useEffect(() => {
    if (isDirty) {
      const originalPush = router.push;

      router.push = async (...args: Parameters<typeof router.push>) => {
        try {
          handleBrowseAway();
          return await originalPush.apply(router, args);
        } catch (e) {
          if (e === "Route change aborted. User cancelled navigation.") {
            return;
          }
          throw e;
        }
      };

      return () => {
        router.push = originalPush;
      };
    }
  }, [isDirty, handleBrowseAway, router]);
}
