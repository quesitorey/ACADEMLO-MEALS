import bcrypt from 'bcrypt'

export const encryptPassword = async password => {
    const jump = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, jump)
}

export const verifyPassword = async (bodyPassword, userPassword) => {
    return await bcrypt.compare(bodyPassword, userPassword)
}