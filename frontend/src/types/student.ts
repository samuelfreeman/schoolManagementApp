export interface Student {
    firstName: String
    lastName: String
    otherName: String
    gender: gender
    photoUrl: String
    photoKey: String
    studentId: String
    password: String
    contact: String
    subject: subject[]


}

enum gender {
    MALE,
    FEMALE,
}

enum subject {
    ENGLISH,
    MATHEMATICS,
    SCIENCE,
    SOCIAL_STUDIES,
    KISWAHILI,
}


