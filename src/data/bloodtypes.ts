export interface BloodType {
    type : string,
    en : string,
    jp : string
}

const BLOOD_TYPES = [
    { type : 'A', en : 'A', jp : 'A型' },
    { type : 'B', en : 'B', jp : 'B型' },
    { type : 'AB', en : 'AB', jp : 'AB型' },
    { type : 'O', en : 'O', jp : 'O型' }
]

export default BLOOD_TYPES;