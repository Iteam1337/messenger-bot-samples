// Commonality Group
let dietCommonality = {
  story_invitation: 'Tell a story about why you eat food the way you do, or how it has affected you.',
  id: 'd175e833-d893-47f9-9c68-a3c68c467aa6',
  statements: {
    'ed63feaf-6f9d-4827-9779-2005013bbfce': {
      text: 'I am a vegan',
      weight: 3 // used to consider certain commonalities more "interesting" - it's more 
                // useful for bonding purposes that two people are vegans than vegetarian
    },
    '12a785bb-5359-400d-8e8c-a25d1c2efbc8': {
      text: 'I am gluten intolerant',
      weight: 2
    },
    'c31123a9-6cc3-4aa2-ab96-48f2d47b9036': {
      text: 'I am a vegetarian',
      weight: 1
    },
  }
}

// Value Statement
let benevolenceValueStatement = {
  id: 'e616fe83-6605-4b7e-94a0-428b5f4eb69b',
  text: 'It\'s very important to ${HIM_HER} to help people around ${HIM_HER}. ${HE_SHE} wants to care for other people.',
  trait: 'benevolence', // "poor mans enum" can be one of the 10 traits, universalism, power etc.
  index: 12 // The order which the questions should be asked the user, partially
            // to make the data more deterministic, but also to not "prime" the user
            // by asking similar questions right after eachother
}

// Answers
let someValueStatementAnswer = {
  user_id: '4c84e785-35ca-45a6-9df1-0b85f16ef1e2',
  value_statement_id: 'e616fe83-6605-4b7e-94a0-428b5f4eb69b', // <- refers to benevolence value statement above
  
  answer: 3 /*
  6= very much like me
  5 = like me
  4 = somewhat like me
  3 = a little like me
  2 = not like me
  1 = not like me a tall
  */
}

let someCommonalityAnswer = {
  user_id: '4c84e785-35ca-45a6-9df1-0b85f16ef1e2',
  commonality_id: '12a785bb-5359-400d-8e8c-a25d1c2efbc8', // <-- I am gluten intolerant
  // since all commonalites are binary - you either have them or you don't,
  // we don't need anything else here

}