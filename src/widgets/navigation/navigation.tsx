import * as React from "react";
import Link from "next/link";

export function Navigation() {
  return (
    <div className={"flex gap-2"}>
      <Link href={"formik"}>formik</Link>
      <Link href={"rfk"}>rfk</Link>
      <Link href={"form"}>form</Link>
      <Link href={"modal"}>modal</Link>
    </div>
  );
}
