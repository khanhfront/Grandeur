// components/PropertyCard.tsx
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaStar, FaBed, FaBath, FaUsers } from "react-icons/fa";
import ButtonLink from "../button/link-button";
import { slugify } from "@/utils/slugnify";
import dynamic from "next/dynamic";
import Link from "next/link";

const SaveWishedProperty = dynamic(() => import("./save"), {
  ssr: false,
});

type PropertyCardProps = {
  property: PropertyCardType;
  index: number;
};

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const isLoved = property.averagePropertyRating > 4.7 || property.isSponsored;

  const formatPrice = (price: number) => {
    if (price < 1_000_000) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } else if (price < 1_000_000_000) {
      return (
        new Intl.NumberFormat("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(price / 1_000_000) + "M"
      );
    } else {
      return (
        new Intl.NumberFormat("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 3,
        }).format(price / 1_000_000_000) + "B"
      );
    }
  };

  return (
    <Card
      className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 
    hover:translate-y-1 transition-transform border-transparent dark:border-border relative"
    >
      <CardHeader className="p-0 space-y-0 relative">
        <Link
          href={`/property/${slugify(property.propertyName)}-${
            property.propertyId
          }`}
          className="relative w-full h-0 pb-[80%] block"
        >
          <Image
            src={property.mainPhotoUrl}
            alt={property.propertyName}
            title={property.propertyName}
            fill
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDkuNjI3MyA5LjI4NDk5QzU2LjMxOCAtMy4xNzAxNCA3My44MjM0IC0zLjA3NDkyIDgwLjM4NDYgOS40NTIyOEw4Ni4xNjA3IDIwLjQ4MDVMOTkuMjkxMyAxOS4wNjQyQzExMi41MTUgMTcuNjM4IDEyMi40IDMxLjIzOTggMTE3LjI3MyA0My44MDU2TDExMi40MzIgNTUuNjY5MUwxMjIuODEyIDY1LjQ4MzRDMTMxLjkxIDc0LjA4NTMgMTI4LjUyMSA4OS41NDc4IDExNi43MDYgOTMuMzQwNUwxMDMuMTQyIDk3LjY5NDdMMTAyLjQxNiAxMTIuMTZDMTAxLjc4MiAxMjQuODAyIDg4LjA1NDkgMTMyLjAzIDc3LjY0ODggMTI1LjJMNjQuMTE5OCAxMTYuMzIyTDUwLjE4MjYgMTI1LjQwMUMzOS44MTMgMTMyLjE1NyAyNi4xNzQ5IDEyNS4wMDQgMjUuNDY1NyAxMTIuNDM3TDI0LjYzMDUgOTcuNjM3NkwxMS4zODA1IDkzLjQ2ODFDLTAuNjY4OTkgODkuNjc2NCAtMy45ODQ2MyA3My44MTQ4IDUuNDkyODQgNjUuMzAyMUwxNS43NzUzIDU2LjA2NjRMMTAuODYyIDQzLjM5MzlDNi4wMTI3IDMwLjg4NjQgMTUuODQ2IDE3LjU2OTYgMjguOTE2MSAxOC45NDRMNDMuNjA4NiAyMC40ODkyTDQ5LjYyNzMgOS4yODQ5OVpNMzkuOTQzMyAyNy4zMTIyTDI4LjIwMTEgMjYuMDc3NEMyMC4zNTkgMjUuMjUyNyAxNC40NTkgMzMuMjQyOCAxNy4zNjg2IDQwLjc0NzNMMjEuMzYyNCA1MS4wNDgxTDI1LjY5MjMgNDcuMTU5QzMwLjI4MTUgNDMuMDM2OSAzNC4xMzM5IDM4LjEyNjggMzcuMDc2NCAzMi42NDkyTDM5Ljk0MzMgMjcuMzEyMlpNMjQuMTA1IDU4LjEyMjFMMzAuMzA4MSA1Mi41NTA1QzM1LjUwOTMgNDcuODc4OCAzOS44NzUzIDQyLjMxNCA0My4yMTAxIDM2LjEwNkw0Ny41MDY3IDI4LjEwNzZMNTguOTY2MyAyOS4zMTI3QzYzLjA1OSAyOS43NDMxIDY3LjE4NDIgMjkuNzM3NiA3MS4yNzU4IDI5LjI5NjNMODIuMjE1NCAyOC4xMTY1TDg2LjU1ODQgMzYuNDA4N0M4OS42ODgxIDQyLjM4NDIgOTMuNzY5NCA0Ny43ODI5IDk4LjYzNDEgNTIuMzgyM0wxMDQuMDgzIDU3LjUzNDNMMTAxLjMwNyA2NC4zMzgxQzk4LjY2NTEgNzAuODEyOCA5Ny4xMzQ3IDc3LjcwNjIgOTYuNzgzMSA4NC43MTQ0TDk2LjQwMDQgOTIuMzQ0Mkw4Ny4xMDY5IDk1LjMyNzVDODIuMTI1NiA5Ni45MjY2IDc3LjM3MTQgOTkuMTkgNzIuOTY2NiAxMDIuMDZMNjQuMTMzNiAxMDcuODE0TDU1LjYyMjQgMTAyLjIyOUM1MS4wNzY2IDk5LjI0NTIgNDYuMTU1NSA5Ni45MDk1IDQwLjk5NDggOTUuMjg1NUwzMS4zMzg5IDkyLjI0N0wzMC44NzIgODMuOTczOUMzMC41MDQ2IDc3LjQ2MzUgMjkuMTE5NSA3MS4wNTU4IDI2Ljc2OTcgNjQuOTk1TDI0LjEwNSA1OC4xMjIxWk0xOC41MTc5IDYzLjE0MDRMMTAuMTA4NyA3MC42OTM2QzQuNzUxODUgNzUuNTA1MSA2LjYyNTg5IDg0LjQ3MDQgMTMuNDM2NSA4Ni42MTM1TDI0LjE5OTUgOTAuMDAwNEwyMy44ODI3IDg0LjM4NzdDMjMuNTU4NiA3OC42NDMzIDIyLjMzNjUgNzIuOTg5NCAyMC4yNjMxIDY3LjY0MTZMMTguNTE3OSA2My4xNDA0Wk0zMS43Njk5IDk5Ljg4NDJMMzIuNDU0OSAxMTIuMDIzQzMyLjg1NTggMTE5LjEyNiA0MC41NjQzIDEyMy4xNjkgNDYuNDI1NCAxMTkuMzUxTDU3LjYyMTMgMTEyLjA1N0w1MS44NDU1IDEwOC4yNjZDNDcuODM0NSAxMDUuNjM0IDQzLjQ5MjQgMTAzLjU3MyAzOC45Mzg4IDEwMi4xNEwzMS43Njk5IDk5Ljg4NDJaTTcwLjYzMjEgMTEyLjA3OUw4MS40MjU3IDExOS4xNjNDODcuMzA3NCAxMjMuMDIzIDk1LjA2NjMgMTE4LjkzNyA5NS40MjQ4IDExMS43OTJMOTYuMDE3MiA5OS45ODE5TDg5LjIwMDYgMTAyLjE3Qzg0LjgwNTQgMTAzLjU4MSA4MC42MTA1IDEwNS41NzggNzYuNzIzOSAxMDguMTFMNzAuNjMyMSAxMTIuMDc5Wk0xMDMuNTI1IDkwLjA1N0wxMTQuNjEyIDg2LjQ5NzlDMTIxLjI5IDg0LjM1NDEgMTIzLjIwNiA3NS42MTQ1IDExOC4wNjQgNzAuNzUyNUwxMDkuNTU5IDYyLjcxMTJMMTA3Ljc2NiA2Ny4xMDMzQzEwNS40MzUgNzIuODE2MyAxMDQuMDg1IDc4Ljg5ODcgMTAzLjc3NSA4NS4wODIzTDEwMy41MjUgOTAuMDU3Wk0xMDYuOTU3IDUwLjQ5MjNMMTEwLjgxMyA0MS4wNDA1QzExMy44OSAzMy41MDEgMTA3Ljk1OCAyNS4zMzk5IDEwMC4wMjQgMjYuMTk1Nkw4OS43MzUyIDI3LjMwNTRMOTIuNzI3NyAzMy4wMTg4Qzk1LjQ4OTIgMzguMjkxMyA5OS4wOTAzIDQzLjA1NDggMTAzLjM4MyA0Ny4xMTMyTDEwNi45NTcgNTAuNDkyM1pNNzguNjQwOCAyMS4yOTE1TDcwLjU0MjcgMjIuMTY1QzY2LjkzMjQgMjIuNTU0MyA2My4yOTI1IDIyLjU1OTIgNTkuNjgxNCAyMi4xNzk0TDUxLjE3MiAyMS4yODQ1TDU1Ljc2MSAxMi43NDE4QzU5Ljc3NTQgNS4yNjg3MyA3MC4yNzg3IDUuMzI1ODYgNzQuMjE1NCAxMi44NDIyTDc4LjY0MDggMjEuMjkxNVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xXzEwKSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQ5LjYyNzMgOS4yODQ5OUM1Ni4zMTggLTMuMTcwMTQgNzMuODIzNCAtMy4wNzQ5MiA4MC4zODQ2IDkuNDUyMjhMODYuMTYwNyAyMC40ODA1TDk5LjI5MTMgMTkuMDY0MkMxMTIuNTE1IDE3LjYzOCAxMjIuNCAzMS4yMzk4IDExNy4yNzMgNDMuODA1NkwxMTIuNDMyIDU1LjY2OTFMMTIyLjgxMiA2NS40ODM0QzEzMS45MSA3NC4wODUzIDEyOC41MjEgODkuNTQ3OCAxMTYuNzA2IDkzLjM0MDVMMTAzLjE0MiA5Ny42OTQ3TDEwMi40MTYgMTEyLjE2QzEwMS43ODIgMTI0LjgwMiA4OC4wNTQ5IDEzMi4wMyA3Ny42NDg4IDEyNS4yTDY0LjExOTggMTE2LjMyMkw1MC4xODI2IDEyNS40MDFDMzkuODEzIDEzMi4xNTcgMjYuMTc0OSAxMjUuMDA0IDI1LjQ2NTcgMTEyLjQzN0wyNC42MzA1IDk3LjYzNzZMMTEuMzgwNSA5My40NjgxQy0wLjY2ODk5IDg5LjY3NjQgLTMuOTg0NjMgNzMuODE0OCA1LjQ5Mjg0IDY1LjMwMjFMMTUuNzc1MyA1Ni4wNjY0TDEwLjg2MiA0My4zOTM5QzYuMDEyNyAzMC44ODY0IDE1Ljg0NiAxNy41Njk2IDI4LjkxNjEgMTguOTQ0TDQzLjYwODYgMjAuNDg5Mkw0OS42MjczIDkuMjg0OTlaTTM5Ljk0MzMgMjcuMzEyMkwyOC4yMDExIDI2LjA3NzRDMjAuMzU5IDI1LjI1MjcgMTQuNDU5IDMzLjI0MjggMTcuMzY4NiA0MC43NDczTDIxLjM2MjQgNTEuMDQ4MUwyNS42OTIzIDQ3LjE1OUMzMC4yODE1IDQzLjAzNjkgMzQuMTMzOSAzOC4xMjY4IDM3LjA3NjQgMzIuNjQ5MkwzOS45NDMzIDI3LjMxMjJaTTI0LjEwNSA1OC4xMjIxTDMwLjMwODEgNTIuNTUwNUMzNS41MDkzIDQ3Ljg3ODggMzkuODc1MyA0Mi4zMTQgNDMuMjEwMSAzNi4xMDZMNDcuNTA2NyAyOC4xMDc2TDU4Ljk2NjMgMjkuMzEyN0M2My4wNTkgMjkuNzQzMSA2Ny4xODQyIDI5LjczNzYgNzEuMjc1OCAyOS4yOTYzTDgyLjIxNTQgMjguMTE2NUw4Ni41NTg0IDM2LjQwODdDODkuNjg4MSA0Mi4zODQyIDkzLjc2OTQgNDcuNzgyOSA5OC42MzQxIDUyLjM4MjNMMTA0LjA4MyA1Ny41MzQzTDEwMS4zMDcgNjQuMzM4MUM5OC42NjUxIDcwLjgxMjggOTcuMTM0NyA3Ny43MDYyIDk2Ljc4MzEgODQuNzE0NEw5Ni40MDA0IDkyLjM0NDJMODcuMTA2OSA5NS4zMjc1QzgyLjEyNTYgOTYuOTI2NiA3Ny4zNzE0IDk5LjE5IDcyLjk2NjYgMTAyLjA2TDY0LjEzMzYgMTA3LjgxNEw1NS42MjI0IDEwMi4yMjlDNTEuMDc2NiA5OS4yNDUyIDQ2LjE1NTUgOTYuOTA5NSA0MC45OTQ4IDk1LjI4NTVMMzEuMzM4OSA5Mi4yNDdMMzAuODcyIDgzLjk3MzlDMzAuNTA0NiA3Ny40NjM1IDI5LjExOTUgNzEuMDU1OCAyNi43Njk3IDY0Ljk5NUwyNC4xMDUgNTguMTIyMVpNMTguNTE3OSA2My4xNDA0TDEwLjEwODcgNzAuNjkzNkM0Ljc1MTg1IDc1LjUwNTEgNi42MjU4OSA4NC40NzA0IDEzLjQzNjUgODYuNjEzNUwyNC4xOTk1IDkwLjAwMDRMMjMuODgyNyA4NC4zODc3QzIzLjU1ODYgNzguNjQzMyAyMi4zMzY1IDcyLjk4OTQgMjAuMjYzMSA2Ny42NDE2TDE4LjUxNzkgNjMuMTQwNFpNMzEuNzY5OSA5OS44ODQyTDMyLjQ1NDkgMTEyLjAyM0MzMi44NTU4IDExOS4xMjYgNDAuNTY0MyAxMjMuMTY5IDQ2LjQyNTQgMTE5LjM1MUw1Ny42MjEzIDExMi4wNTdMNTEuODQ1NSAxMDguMjY2QzQ3LjgzNDUgMTA1LjYzNCA0My40OTI0IDEwMy41NzMgMzguOTM4OCAxMDIuMTRMMzEuNzY5OSA5OS44ODQyWk03MC42MzIxIDExMi4wNzlMODEuNDI1NyAxMTkuMTYzQzg3LjMwNzQgMTIzLjAyMyA5NS4wNjYzIDExOC45MzcgOTUuNDI0OCAxMTEuNzkyTDk2LjAxNzIgOTkuOTgxOUw4OS4yMDA2IDEwMi4xN0M4NC44MDU0IDEwMy41ODEgODAuNjEwNSAxMDUuNTc4IDc2LjcyMzkgMTA4LjExTDcwLjYzMjEgMTEyLjA3OVpNMTAzLjUyNSA5MC4wNTdMMTE0LjYxMiA4Ni40OTc5QzEyMS4yOSA4NC4zNTQxIDEyMy4yMDYgNzUuNjE0NSAxMTguMDY0IDcwLjc1MjVMMTA5LjU1OSA2Mi43MTEyTDEwNy43NjYgNjcuMTAzM0MxMDUuNDM1IDcyLjgxNjMgMTA0LjA4NSA3OC44OTg3IDEwMy43NzUgODUuMDgyM0wxMDMuNTI1IDkwLjA1N1pNMTA2Ljk1NyA1MC40OTIzTDExMC44MTMgNDEuMDQwNUMxMTMuODkgMzMuNTAxIDEwNy45NTggMjUuMzM5OSAxMDAuMDI0IDI2LjE5NTZMODkuNzM1MiAyNy4zMDU0TDkyLjcyNzcgMzMuMDE4OEM5NS40ODkyIDM4LjI5MTMgOTkuMDkwMyA0My4wNTQ4IDEwMy4zODMgNDcuMTEzMkwxMDYuOTU3IDUwLjQ5MjNaTTc4LjY0MDggMjEuMjkxNUw3MC41NDI3IDIyLjE2NUM2Ni45MzI0IDIyLjU1NDMgNjMuMjkyNSAyMi41NTkyIDU5LjY4MTQgMjIuMTc5NEw1MS4xNzIgMjEuMjg0NUw1NS43NjEgMTIuNzQxOEM1OS43NzU0IDUuMjY4NzMgNzAuMjc4NyA1LjMyNTg2IDc0LjIxNTQgMTIuODQyMkw3OC42NDA4IDIxLjI5MTVaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfMV8xMCkiLz4KPHBhdGggZD0iTTY3LjMwNCA5MC42NEM2NC4wNjEzIDkwLjY0IDYxLjAzMiA5MC4wNjQgNTguMjE2IDg4LjkxMkM1NS40IDg3LjcxNzMgNTIuOTI1MyA4Ni4wNzQ3IDUwLjc5MiA4My45ODRDNDguNjU4NyA4MS44OTMzIDQ2Ljk5NDcgNzkuNDYxMyA0NS44IDc2LjY4OEM0NC42NDggNzMuODcyIDQ0LjA3MiA3MC44NDI3IDQ0LjA3MiA2Ny42QzQ0LjA3MiA2NC40IDQ0LjY0OCA2MS40MTMzIDQ1LjggNTguNjRDNDYuOTk0NyA1NS44NjY3IDQ4LjYzNzMgNTMuNDU2IDUwLjcyOCA1MS40MDhDNTIuODYxMyA0OS4zMTczIDU1LjMzNiA0Ny42OTYgNTguMTUyIDQ2LjU0NEM2MC45NjggNDUuMzkyIDYzLjk5NzMgNDQuODE2IDY3LjI0IDQ0LjgxNkM2OS41MDEzIDQ0LjgxNiA3MS42OTg3IDQ1LjEzNiA3My44MzIgNDUuNzc2Qzc2LjAwOCA0Ni40MTYgNzcuOTcwNyA0Ny4zMTIgNzkuNzIgNDguNDY0QzgxLjQ2OTMgNDkuNjE2IDgyLjg5ODcgNTAuOTM4NyA4NC4wMDggNTIuNDMyTDc5LjUyOCA1Ny4xMDRDNzcuNjA4IDU1LjI2OTMgNzUuNjAyNyA1My44ODI3IDczLjUxMiA1Mi45NDRDNzEuNDY0IDUyLjAwNTMgNjkuMzczMyA1MS41MzYgNjcuMjQgNTEuNTM2QzY0LjkzNiA1MS41MzYgNjIuODAyNyA1MS45NDEzIDYwLjg0IDUyLjc1MkM1OC45MiA1My41NjI3IDU3LjIxMzMgNTQuNjkzMyA1NS43MiA1Ni4xNDRDNTQuMjY5MyA1Ny41OTQ3IDUzLjEzODcgNTkuMzAxMyA1Mi4zMjggNjEuMjY0QzUxLjUxNzMgNjMuMTg0IDUxLjExMiA2NS4yOTYgNTEuMTEyIDY3LjZDNTEuMTEyIDY5LjgxODcgNTEuNTM4NyA3MS45MzA3IDUyLjM5MiA3My45MzZDNTMuMjQ1MyA3NS44OTg3IDU0LjQxODcgNzcuNjI2NyA1NS45MTIgNzkuMTJDNTcuNDQ4IDgwLjYxMzMgNTkuMTk3MyA4MS43ODY3IDYxLjE2IDgyLjY0QzYzLjE2NTMgODMuNDkzMyA2NS4yNzczIDgzLjkyIDY3LjQ5NiA4My45MkM2OS4xNiA4My45MiA3MC43Mzg3IDgzLjY4NTMgNzIuMjMyIDgzLjIxNkM3My43MjUzIDgyLjcwNCA3NS4wNDggODIgNzYuMiA4MS4xMDRDNzcuMzUyIDgwLjIwOCA3OC4yNDggNzkuMTg0IDc4Ljg4OCA3OC4wMzJDNzkuNTI4IDc2LjgzNzMgNzkuODQ4IDc1LjU3ODcgNzkuODQ4IDc0LjI1NlY3Mi45NzZMODAuODA4IDczLjg3Mkg2Ny4xMTJWNjcuMDI0SDg2Ljk1MkM4Ny4wMzczIDY3LjQ5MzMgODcuMTAxMyA2Ny45NjI3IDg3LjE0NCA2OC40MzJDODcuMTg2NyA2OC44NTg3IDg3LjIwOCA2OS4yODUzIDg3LjIwOCA2OS43MTJDODcuMjUwNyA3MC4wOTYgODcuMjcyIDcwLjQ4IDg3LjI3MiA3MC44NjRDODcuMjcyIDczLjgwOCA4Ni43NiA3Ni40OTYgODUuNzM2IDc4LjkyOEM4NC43MTIgODEuMzE3MyA4My4yODI3IDgzLjM4NjcgODEuNDQ4IDg1LjEzNkM3OS42NTYgODYuODg1MyA3Ny41NDQgODguMjUwNyA3NS4xMTIgODkuMjMyQzcyLjcyMjcgOTAuMTcwNyA3MC4xMiA5MC42NCA2Ny4zMDQgOTAuNjRaIiBmaWxsPSJ1cmwoI3BhaW50Ml9saW5lYXJfMV8xMCkiLz4KPHBhdGggZD0iTTY3LjMwNCA5MC42NEM2NC4wNjEzIDkwLjY0IDYxLjAzMiA5MC4wNjQgNTguMjE2IDg4LjkxMkM1NS40IDg3LjcxNzMgNTIuOTI1MyA4Ni4wNzQ3IDUwLjc5MiA4My45ODRDNDguNjU4NyA4MS44OTMzIDQ2Ljk5NDcgNzkuNDYxMyA0NS44IDc2LjY4OEM0NC42NDggNzMuODcyIDQ0LjA3MiA3MC44NDI3IDQ0LjA3MiA2Ny42QzQ0LjA3MiA2NC40IDQ0LjY0OCA2MS40MTMzIDQ1LjggNTguNjRDNDYuOTk0NyA1NS44NjY3IDQ4LjYzNzMgNTMuNDU2IDUwLjcyOCA1MS40MDhDNTIuODYxMyA0OS4zMTczIDU1LjMzNiA0Ny42OTYgNTguMTUyIDQ2LjU0NEM2MC45NjggNDUuMzkyIDYzLjk5NzMgNDQuODE2IDY3LjI0IDQ0LjgxNkM2OS41MDEzIDQ0LjgxNiA3MS42OTg3IDQ1LjEzNiA3My44MzIgNDUuNzc2Qzc2LjAwOCA0Ni40MTYgNzcuOTcwNyA0Ny4zMTIgNzkuNzIgNDguNDY0QzgxLjQ2OTMgNDkuNjE2IDgyLjg5ODcgNTAuOTM4NyA4NC4wMDggNTIuNDMyTDc5LjUyOCA1Ny4xMDRDNzcuNjA4IDU1LjI2OTMgNzUuNjAyNyA1My44ODI3IDczLjUxMiA1Mi45NDRDNzEuNDY0IDUyLjAwNTMgNjkuMzczMyA1MS41MzYgNjcuMjQgNTEuNTM2QzY0LjkzNiA1MS41MzYgNjIuODAyNyA1MS45NDEzIDYwLjg0IDUyLjc1MkM1OC45MiA1My41NjI3IDU3LjIxMzMgNTQuNjkzMyA1NS43MiA1Ni4xNDRDNTQuMjY5MyA1Ny41OTQ3IDUzLjEzODcgNTkuMzAxMyA1Mi4zMjggNjEuMjY0QzUxLjUxNzMgNjMuMTg0IDUxLjExMiA2NS4yOTYgNTEuMTEyIDY3LjZDNTEuMTEyIDY5LjgxODcgNTEuNTM4NyA3MS45MzA3IDUyLjM5MiA3My45MzZDNTMuMjQ1MyA3NS44OTg3IDU0LjQxODcgNzcuNjI2NyA1NS45MTIgNzkuMTJDNTcuNDQ4IDgwLjYxMzMgNTkuMTk3MyA4MS43ODY3IDYxLjE2IDgyLjY0QzYzLjE2NTMgODMuNDkzMyA2NS4yNzczIDgzLjkyIDY3LjQ5NiA4My45MkM2OS4xNiA4My45MiA3MC43Mzg3IDgzLjY4NTMgNzIuMjMyIDgzLjIxNkM3My43MjUzIDgyLjcwNCA3NS4wNDggODIgNzYuMiA4MS4xMDRDNzcuMzUyIDgwLjIwOCA3OC4yNDggNzkuMTg0IDc4Ljg4OCA3OC4wMzJDNzkuNTI4IDc2LjgzNzMgNzkuODQ4IDc1LjU3ODcgNzkuODQ4IDc0LjI1NlY3Mi45NzZMODAuODA4IDczLjg3Mkg2Ny4xMTJWNjcuMDI0SDg2Ljk1MkM4Ny4wMzczIDY3LjQ5MzMgODcuMTAxMyA2Ny45NjI3IDg3LjE0NCA2OC40MzJDODcuMTg2NyA2OC44NTg3IDg3LjIwOCA2OS4yODUzIDg3LjIwOCA2OS43MTJDODcuMjUwNyA3MC4wOTYgODcuMjcyIDcwLjQ4IDg3LjI3MiA3MC44NjRDODcuMjcyIDczLjgwOCA4Ni43NiA3Ni40OTYgODUuNzM2IDc4LjkyOEM4NC43MTIgODEuMzE3MyA4My4yODI3IDgzLjM4NjcgODEuNDQ4IDg1LjEzNkM3OS42NTYgODYuODg1MyA3Ny41NDQgODguMjUwNyA3NS4xMTIgODkuMjMyQzcyLjcyMjcgOTAuMTcwNyA3MC4xMiA5MC42NCA2Ny4zMDQgOTAuNjRaIiBmaWxsPSJ1cmwoI3BhaW50M19saW5lYXJfMV8xMCkiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMV8xMCIgeDE9Ijk4LjEzMzMiIHkxPSIxMC45MDkxIiB4Mj0iMzQuNDc1OSIgeTI9IjEyMy44ODIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGMTA4MCIvPgo8c3RvcCBvZmZzZXQ9IjAuOTYzNTQzIiBzdG9wLWNvbG9yPSIjNDJDNEZGIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8xXzEwIiB4MT0iMjcuNzMzMyIgeTE9IjE2IiB4Mj0iMTI5LjYwNyIgeTI9IjkwLjUzMDciIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGOTEyNCIvPgo8c3RvcCBvZmZzZXQ9IjAuMiIgc3RvcC1jb2xvcj0iI0ZGOTc5OCIgc3RvcC1vcGFjaXR5PSIwLjUxOTA4NSIvPgo8c3RvcCBvZmZzZXQ9IjAuNCIgc3RvcC1jb2xvcj0iI0VFOTg4QiIgc3RvcC1vcGFjaXR5PSIwLjIiLz4KPHN0b3Agb2Zmc2V0PSIwLjYiIHN0b3AtY29sb3I9IiNFRDkwQTkiIHN0b3Atb3BhY2l0eT0iMCIvPgo8c3RvcCBvZmZzZXQ9IjAuOCIgc3RvcC1jb2xvcj0iI0VDODhDNSIgc3RvcC1vcGFjaXR5PSIwLjIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRUE3QUZBIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl8xXzEwIiB4MT0iNjUuNSIgeTE9IjI2IiB4Mj0iNjUuNSIgeTI9IjEwNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkYxMDgwIi8+CjxzdG9wIG9mZnNldD0iMC45NiIgc3RvcC1jb2xvcj0iIzQyQzRGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50M19saW5lYXJfMV8xMCIgeDE9IjY1LjUiIHkxPSIyNiIgeDI9IjY1LjUiIHkyPSIxMDYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGOTEyNCIvPgo8c3RvcCBvZmZzZXQ9IjAuMiIgc3RvcC1jb2xvcj0iI0ZGOTc5OCIgc3RvcC1vcGFjaXR5PSIwLjUyIi8+CjxzdG9wIG9mZnNldD0iMC40IiBzdG9wLWNvbG9yPSIjRUU5ODhCIiBzdG9wLW9wYWNpdHk9IjAuMiIvPgo8c3RvcCBvZmZzZXQ9IjAuNiIgc3RvcC1jb2xvcj0iI0VEOTBBOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0VBN0FGQSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo="
            className="object-center object-cover rounded-t-lg"
            sizes="(max-width: 430px) 50vw, (max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 22vw"
            priority={index < 4}
            loading={index < 4 ? "eager" : "lazy"}
            decoding="sync"
          />
          {isLoved && (
            <Badge className="absolute top-2 left-2 md:left-3 lg:left-4 bg-hdbg text-black outline outline-[1px] outline-white hover:bg-white focus:ring-0">
              HOT
            </Badge>
          )}
        </Link>
        <SaveWishedProperty propertyId={property.propertyId} />
      </CardHeader>
      <CardContent className="px-2 md:px-3 lg:px-4 pt-1 pb-0">
        <div className="min-[180px]:flex justify-between items-center gap-1 mb-1">
          <h2 className="text-sm md:text-md lg:text-lg font-bold text-foreground truncate">
            {property.propertyName}
          </h2>
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="text-foreground">
              {property.averagePropertyRating}
            </span>
            <span className="text-secondary-foreground ml-1">
              ({property.numberPropertyRating})
            </span>
          </div>
        </div>
        <div className="mb-1">
          <p className="text-secondary-foreground text-sm xl:text-base min-[2000px]:text-lg truncate">
            Chủ nhà:{" "}
            <span className="font-bold text-secondary-foreground truncate">
              {property.hostName}
            </span>
          </p>
        </div>
        <p className="text-secondary-foreground mb-1 text-sm xl:text-base min-[2000px]:text-lg truncate">
          {property.districtName}, {property.provinceName}
        </p>
        <div className="min-[330px]:flex justify-between items-center mb-1 md:mb-3 xl:mb-4">
          <div className="min-[180px]:flex gap-1 sm:gap-2 md:gap-3 min-[2400px]:gap-4">
            <span className="flex items-center text-foreground text-sm xl:text-base min-[2000px]:text-lg gap-1">
              <FaBed /> {property.bedCount ?? "N/A"}
            </span>
            <span className="flex items-center text-foreground text-sm xl:text-base min-[2000px]:text-lg gap-1">
              <FaBath /> {property.bathroomCount ?? "N/A"}
            </span>
            <span className="flex items-center text-foreground text-sm xl:text-base min-[2000px]:text-lg gap-1">
              <FaUsers /> {property.maxGuest ?? "N/A"}
            </span>
          </div>
          <span className="text-xs sm:text-sm xl:text-base min-[2000px]:text-lg font-bold text-foreground truncate">
            {formatPrice(property.pricePerNight)}
            <span className="font-normal"> / đêm</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center px-2 md:px-3 lg:px-4 pb-2 md:pb-4">
        <ButtonLink
          url={`/property/${slugify(property.propertyName)}-${
            property.propertyId
          }`}
          className="w-full rounded-xl bg-hdbg text-xs sm:text-sm md:text-base min-[2000px]:text-lg hover:no-underline dark:text-black"
        >
          Xem ngay
        </ButtonLink>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
