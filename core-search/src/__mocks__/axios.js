const mockAxios = jest.genMockFromModule('axios')

//https://stackoverflow.com/questions/51393952/mock-inner-axios-create
// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios)

export default mockAxios