import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/page/1");
}
