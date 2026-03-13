export interface Uns {
  name: string
}

const unstoppableResolution = async (address: string): Promise<Uns | null> => {
  if (!address) return null

  try {
    let uns = null

    const { Resolution } = await import('@unstoppabledomains/resolution')

    const resolutionInstance = new Resolution()
    const name = await resolutionInstance.reverse(address)

    if (name) {
      uns = {
        name
      }
    }

    return uns
  } catch (error) {
    console.error(error)
    return null
  }
}

export default unstoppableResolution
