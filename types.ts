import z from "zod"

export const clientFormScheme = z.object({
    basicInfo: z.object({
        clientName: z.string().min(1),
        companyName: z.string(),
        email: z.string().min(1),
        phoneNumber: z.string().min(1),
    }),
    businessGoals: z.object({
        businessDescription: z.string().min(1),
        mission: z.string(),
        goals: z.string(),
    }),
    targetAudience: z.object({
        ageGroup: z.string(),
        location: z.string(),
        interests: z.string(),
    }),
    designPreferences: z.object({
        designStyle: z.string(),
        colorPreferences: z.string(),
        existingMaterials: z.string(),
    }),
    content: z.object({
        providingContent: z.boolean(),
        preferredContentTypes: z.string(),
        requiredFeatures: z.string(),
    }),

    websiteStucture: z.object({
        siteStucture: z.string(),
        specifcPagesWanted: z.string(),
    }),
    project: z.object({
        preferredCMS: z.string(),
        hostingPreferences: z.string(),
        projectTimeline: z.string().min(1),
        budgetConstraints: z.string(),
    }),

    additionalNotes: z.object({
        additionalInfo: z.string(),
        reviewExpectation: z.string(),
    }),
    maintenance: z.object({
        onGoingSupportNeeded: z.string(),
    }),
})

export type clientForm = z.infer<typeof clientFormScheme>