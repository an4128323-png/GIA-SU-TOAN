import { GoogleGenAI, GenerateContentResponse, Part } from '@google/genai';
import { ChatMessage } from '../types';

interface GeminiResponse {
  message: ChatMessage;
  groundingUrls?: string[];
}

export const sendChatMessage = async (
  prompt: string,
  base64Image?: string,
): Promise<GeminiResponse> => {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY is not set. Please ensure it is configured.');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = base64Image ? 'gemini-2.5-flash-image' : 'gemini-3-flash-preview';

  try {
    const contents: Part[] = [{ text: prompt }];

    if (base64Image) {
      contents.unshift({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming JPEG, can be dynamic if needed
          data: base64Image,
        },
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: { parts: contents },
      config: {
        // Use Google Search grounding for relevant queries
        tools: [{ googleSearch: {} }],
      },
    });

    let generatedText = '';
    let groundingUrls: string[] = [];

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          generatedText += part.text;
        }
      }

      // Extract grounding URLs
      if (response.candidates[0].groundingMetadata?.groundingChunks) {
        for (const chunk of response.candidates[0].groundingMetadata.groundingChunks) {
          if (chunk.web?.uri) {
            groundingUrls.push(chunk.web.uri);
          }
          if (chunk.maps?.uri) {
            groundingUrls.push(chunk.maps.uri);
          }
          if (chunk.maps?.placeAnswerSources) {
            for (const source of chunk.maps.placeAnswerSources) {
              if (source.reviewSnippets) {
                for (const snippet of source.reviewSnippets) {
                  if (snippet.uri) {
                    groundingUrls.push(snippet.uri);
                  }
                }
              }
            }
          }
        }
      }
    } else {
      generatedText = 'Không thể tạo phản hồi. Vui lòng thử lại.';
    }

    return {
      message: { type: 'ai', text: generatedText.trim() },
      groundingUrls: Array.from(new Set(groundingUrls)), // Remove duplicates
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error) {
      // Check for specific API key related errors from the runtime environment.
      // This is a common pattern for handling situations where the key might be invalid or not selected.
      if (error.message.includes("Requested entity was not found.")) {
        // Assume key selection failure and prompt user to select again.
        // This relies on the global aistudio object.
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
          console.log("Gemini API key might be invalid or not selected. Opening key selection dialog.");
          await window.aistudio.openSelectKey();
          // After attempting to open the dialog, we can re-throw or return a specific error
          // to indicate that the user needs to retry after selecting a key.
          return {
            message: {
              type: 'error',
              text: `Lỗi API: Có vẻ như khóa API Gemini của bạn không hợp lệ hoặc chưa được chọn. Vui lòng thử lại sau khi chọn khóa API hợp lệ. Bạn có thể cần một dự án GCP đã bật tính năng thanh toán để sử dụng Gemini-3-Pro-Image-Preview. Tham khảo: ai.google.dev/gemini-api/docs/billing`
            },
          };
        }
      }
      return { message: { type: 'error', text: `Lỗi API: ${error.message}` } };
    }
    return { message: { type: 'error', text: 'Đã xảy ra lỗi không xác định khi gọi API Gemini.' } };
  }
};
