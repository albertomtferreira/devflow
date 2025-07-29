'use server'
import { smartTag } from '@/ai/flows/smart-tagging'

export async function suggestTagsForCode(codeSnippet: string): Promise<string[]> {
  if (!codeSnippet || codeSnippet.length < 20) {
    return []
  }
  try {
    const result = await smartTag({ codeSnippet })
    return result.tags
  } catch (error) {
    console.error("Error suggesting tags:", error)
    // In a real app, you'd want more robust error handling.
    // For now, we'll return an empty array to prevent crashing the client.
    return []
  }
}
