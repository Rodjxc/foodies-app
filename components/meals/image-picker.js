"use client";

//In this component, we have disabled the default look of the upload image button with the className .input and made our
//own button to customize it. Since we've hiddent the original button, we've used the useRef hook called imageInput to access it when
//we click on  the new button.

//To be able to have a preview of the image we've uplodaded, we need to handle the event that an image was picked, and then save some
//state and show a preview as soon as it detects it

import classes from "./image-picker.module.css";
import { useRef, useState } from "react";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
	const [pickedImage, setPickedImage] = useState();
	const imageInput = useRef();
	function handlePickClick() {
		imageInput.current.click();
	}

	function handleImageChange(event) {
		const file = event.target.files[0];

		if (!file) {
			setPickedImage(null);
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = () => {
			setPickedImage(fileReader.result);
		};

		fileReader.readAsDataURL(file);
	}

	return (
		<div className={classes.picker}>
			<label htmlFor={name}>{label}</label>
			<div className={classes.controls}>
				<div className={classes.preview}>
					{!pickedImage && <p>No image picked yet.</p>}
					{pickedImage && (
						<Image src={pickedImage} alt="Image selected by the user" fill />
					)}
				</div>
				<input
					className={classes.input}
					type="file"
					id={name}
					accept="image/png, image/jpeg"
					name="image"
					ref={imageInput}
					onChange={handleImageChange}
					required
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
