import type { RefObject } from "react"
import type { GenericMap } from "./common"

export type RegistrationData = {
    firstName: string, 
    lastName: string, 
    username: string, 
    email: string, 
    password: string
}

export type LoginData = {
    username: string, 
    password: string
}

export type ProfileData = {
    username: string, 
    email: string, 
}

export type ValidatedFormProps = {
    data: GenericMap,
    errors: GenericMap,
    errorInputRef?: RefObject<HTMLElement | null> | undefined,
    onValueChange: Function
}