
let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];


export const addMetadata = (_edition) => {
    let dateTime = Date.now();
    let tempMetadata = {
        hash: hash.join(""),
        decodedHash: [],
        edition: _edition,
        date: dateTime,
        attributes: attributes,
    }
    metadata.push(tempMetadata);
    attributes = [];
    hash = [];
    decodedHash = [];
};

export const addAttributes = (tempAttributes, layerId, elementId) => {
    attributes.push(tempAttributes);
    hash.push(layerId);
    hash.push(elementId);
    decodedHash.push({[layerId]: elementId});
}