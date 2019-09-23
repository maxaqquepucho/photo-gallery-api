import { connect } from 'mongoose'

export async function startConnection() {
    await connect('mongodb+srv://maxaqq:zaqxswcde@cluster0-hf9ds.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log('Database is connected')
}