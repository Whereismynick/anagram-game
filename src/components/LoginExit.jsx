import { useState } from "react"

const LoginExit = ({ setPlayer, setScore, setTimeLeft }) => {
	const handleExit = () => {
		localStorage.removeItem("nickname")
		setPlayer(null)
		setScore(0)
		setTimeLeft(60)

	}
	return (
		<div>
			<button onClick={handleExit}>Выйти</button>
		</div>
	)
}


export default LoginExit