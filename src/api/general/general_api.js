
export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email)
}

// to shorten a long street address by removing city and postal code
export const shortenAddress = (address) => {
	if (address) {
		const comma = address.indexOf(',')
		if (comma > 7) {
			return address.slice(0, comma)
		} else {
			const nextAddr = address.slice(comma + 1, address.length - 1)
			const nextComma = nextAddr.indexOf(',')
			return address.slice(0, comma + nextComma + 1)
		}
	} else {
		return null
	}
}

export const renderProcessedImage = (url) => {
	if (url) {
		const newurl = url.replace('renthero-images', 'renthero-images-compressed')
		const new_name = newurl.slice(0, newurl.lastIndexOf('/')) + '/hd' + newurl.slice(newurl.lastIndexOf('/'))
    // console.log(new_name)
		return new_name
	} else {
		return url
	}
}

export const renderProcessedThumbnailSquare = (url) => {
	if (url) {
		const newurl = url.replace('renthero-images', 'renthero-images-compressed')
		const new_name = newurl.slice(0, newurl.lastIndexOf('/')) + '/thumbnail/cropped-to-square' + newurl.slice(newurl.lastIndexOf('/'))
		return new_name
	} else {
		return url
	}
}


export const renderProcessedThumbnailLarge = (url) => {
	if (url) {
		const newurl = url.replace('renthero-images', 'renthero-images-compressed')
		const new_name = newurl.slice(0, newurl.lastIndexOf('/')) + '/thumbnail/large' + newurl.slice(newurl.lastIndexOf('/'))
		return new_name
	} else {
		return url
	}
}

export const renderProcessedThumbnailMedium = (url) => {
	if (url) {
		const newurl = url.replace('renthero-images', 'renthero-images-compressed')
		const new_name = newurl.slice(0, newurl.lastIndexOf('/')) + '/thumbnail/medium' + newurl.slice(newurl.lastIndexOf('/'))
		return new_name
	} else {
		return url
	}
}

export const renderProcessedThumbnailSmall = (url) => {
	if (url) {
		const newurl = url.replace('renthero-images', 'renthero-images-compressed')
		const new_name = newurl.slice(0, newurl.lastIndexOf('/')) + '/thumbnail/small' + newurl.slice(newurl.lastIndexOf('/'))
		return new_name
	} else {
		return url
	}
}


export const renderProcessedThumbnail600jpeg = (url) => {
	if (url) {
		const newurl = url.replace('renthero-images', 'renthero-images-compressed')
		const new_name = newurl.slice(0, newurl.lastIndexOf('/')) + '/thumbnail/600-jpeg' + newurl.slice(newurl.lastIndexOf('/'))
		return new_name
	} else {
		return url
	}
}
