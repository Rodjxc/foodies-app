"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import classes from "./nav-link.module.css";

export default function NavLink({ href, children }) {
	const path = usePathname();

	return (
		<>
			{/* To be able to have the class "active" if we're on the page, we use the usePath from
        NextJS to extract the param from the route and the property .startsWith to conditionally
        apply the class if we're on the page*/}
			<Link
				href={href}
				className={path.startsWith(href) ? classes.active : undefined}
			>
				{children}
			</Link>
		</>
	);
}
