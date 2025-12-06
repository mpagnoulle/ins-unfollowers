/** A user you follow on Instagram */
export interface Following {
  title: string
  string_list_data: [{ href: string; timestamp: number }]
}

/** A user who follows you on Instagram */
interface Follower {
  title: string
  media_list_data: unknown[]
  string_list_data: [{ href: string; value: string; timestamp: number }]
}

/** Reads file content as text */
const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (result) {
        resolve(result.toString())
      } else {
        reject(new Error("Error reading file content"))
      }
    }
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })
}

/** Finds users you follow who don't follow you back */
export const findUnfollowers = async (files: File[]): Promise<Following[]> => {
  const followingFile = files.find((file) => file.name === "following.json")
  const followersFile = files.find((file) => file.name === "followers_1.json")

  if (!followingFile || !followersFile) return []

  const [followingContent, followersContent] = await Promise.all([
    readFileContent(followingFile),
    readFileContent(followersFile),
  ])

  const followingData = JSON.parse(followingContent)
  const followersList: Follower[] = JSON.parse(followersContent)
  const followingList: Following[] = followingData.relationships_following

  const followersSet = new Set(
    followersList.map((item) => item.string_list_data[0].value)
  )

  return followingList.filter(
    (followingItem) => !followersSet.has(followingItem.title)
  )
}
