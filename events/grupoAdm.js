const getGroupAdmins = (participants) => { admins = []
for (let i of participants) { i.isAdmin ? admins.push(i.jid) : ''}
return admins }

module.exports = { getGroupAdmins }
