/**
 * YYYY-MM-DD形式の日付文字列をGraphQLのDateTime形式に変換
 * @param dateString YYYY-MM-DD形式の日付文字列
 * @returns ISO 8601 DateTime形式の文字列、またはundefined
 */
export const formatDateForGraphQL = (dateString: string | undefined): string | undefined => {
  if (!dateString) return undefined;
  
  // YYYY-MM-DD形式をYYYY-MM-DDTHH:mm:ssZ形式に変換
  // 時刻は00:00:00UTC（世界協定時）に設定
  return `${dateString}T00:00:00Z`;
};

/**
 * GraphQLのDateTime形式をYYYY-MM-DD形式に変換
 * @param isoString ISO 8601 DateTime形式の文字列
 * @returns YYYY-MM-DD形式の日付文字列 or undefined
 */
export const formatDateFromGraphQL = (isoString: string | undefined): string | undefined => {
  if (!isoString) return undefined;
  
  try {
    // ISO 8601文字列からDateオブジェクトを作成
    const date = new Date(isoString);
    
    // YYYY-MM-DD形式で返す
    return date.toISOString().split('T')[0];
  } catch (error) {
    return undefined;
  }
};

/**
 * 日付文字列が有効かどうかをチェック
 * @param dateString チェックする日付文字列
 * @returns 有効な日付の場合true
 */
export const isValidDateString = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};