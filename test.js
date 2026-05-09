const { data, error } = await supabase.from('profiles').select('*')
console.log(data)