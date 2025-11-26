export default {
    /**
     * 从本地存储中获取指定键的值
     * 
     * @param key - 要获取的存储项键名
     * @returns 对应键的值，如果键不存在则返回null
     */
    // 从本地存储获取指定键的值，自动处理JSON解析
    get(key: string) {
        try {
            const item = localStorage.getItem(key)
            if (!item) return null
            try {
                return JSON.parse(item)
            } catch {
                return item
            }
        } catch (error) {
            console.error('Storage get error:', error)
            return null
        }
    },
    /**
     * 设置本地存储中指定键的值
     * 
     * @param key - 要设置的存储项键名
     * @param value - 要设置的值，可以是字符串、数字、对象等类型
     */
    set(key: string, value: unknown) {
        try {
            const serializedValue = typeof value === 'string' ? value : JSON.stringify(value)
            localStorage.setItem(key, serializedValue)
        } catch (error) {
            console.error('Storage set error:', error)
        }
    },
    /**
     * 从本地存储中移除指定的键值对
     * 
     * @param key - 要删除的存储项键名
     */
    remove(key: string) {
        localStorage.removeItem(key)
    },
    /**
     * 清空本地存储中的所有键值对
     */
    clear() {
        localStorage.clear()
    }
}