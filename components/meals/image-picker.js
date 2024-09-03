"use client";

//In this component, we have disabled the default look of the upload image button with the className .input and made our
//own button to customize it. Since we've hiddent the original button, we've used the useRef hook called imageInput to access it when
//we click on  the new button

import classes from "./image-picker.module.css";
import { useRef } from "react";

export default function ImagePicker({ label, name }) {
	const imageInput = useRef();
	function handlePickClick() {
		imageInput.current.click();
	}

	return (
		<div className={classes.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={classes.controls}>
				<input
					className={classes.input}
					type="file"
					id={name}
					accept="image/png, image/jpeg"
					name="image"
					ref={imageInput}
				/>
				<button
					className={classes.button}
					type="button"
					onClick={handlePickClick}
				>
					Pick an Image
				</button>
			</div>
		</div>
	);
}
