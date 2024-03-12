/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'

const App = () => {
  const [candidates, setCandidates] = useState(['Alice', 'Charlie', 'Bob'])
  const [selectedCandidates, setSelectedCandidates] = useState([])
  const [checkDups, setCheckDups] = useState([])
  const [votesArr, setVotesArr] = useState([])
  const [candidatesArr, setCandidatesArr] = useState([])
  const [BobVotes, setBobVotes] = useState([])
  const [AliceVotes, setAliceVotes] = useState([])
  const [charlieVotes, setCharlieVotes] = useState([])

  const addCandidate = (candidate, idx) => {
    setCheckDups((prev) => [...prev, candidate])
    if (checkDups.includes(candidate)) return
    setSelectedCandidates((prev) => [...prev, candidate])
  }

  const removeCandidate = (idxToRemove) => {
    const newSelectedCandidates = selectedCandidates.filter(
      (candidate, idx) => {
        return idxToRemove !== idx
      }
    )
    const newCheckDups = checkDups.filter((dup, idx) => {
      return idxToRemove !== idx
    })
    setSelectedCandidates(newSelectedCandidates)
    setCheckDups(newCheckDups)
  }

  const addVote = (e) => {
    e.preventDefault()
    if (selectedCandidates.length !== 3) {
      return alert('All of the candidates must be ranked')
    }
    setVotesArr((prev) => [
      ...prev,
      [
        ...selectedCandidates.map((candidate) => {
          return candidate
        }),
      ],
    ])
    setCheckDups([])
    setSelectedCandidates([])
  }

  const showWinner = () => {
    votesArr.map((votes) => {
      votes.forEach((vote, idx) => {
        candidatesArr.push({ name: vote, rank: idx + 1 })
      })
    })
    candidatesArr.map((candidate) => {
      if (candidate.name === 'Bob') {
        setBobVotes((prev) => [
          ...prev,
          { rank: candidate.rank, candidate: candidate.name },
        ])
      } else if (candidate.name === 'Alice') {
        setAliceVotes((prev) => [
          ...prev,
          { rank: candidate.rank, candidate: candidate.name },
        ])
      } else {
        setCharlieVotes((prev) => [
          ...prev,
          { rank: candidate.rank, candidate: candidate.name },
        ])
      }
    })
  }

  return (
    <div className='App'>
      <form onSubmit={addVote}>
        <div className='candidates-container'>
          <h1>Candidates</h1>
          <div>
            {candidates.map((candidate, idx) => {
              return (
                <span
                  className='candidates'
                  key={idx}
                  onClick={() => addCandidate(candidate, idx)}
                >
                  {candidate}
                </span>
              )
            })}
          </div>
        </div>
        <div className='selected-candidates'>
          {selectedCandidates.map((item, idx) => {
            return (
              <div key={idx}>
                {idx + 1}.<span>{item}</span>
                <span className='remove' onClick={() => removeCandidate(idx)}>
                  X
                </span>
              </div>
            )
          })}
        </div>
        <button>Add Vote</button>
      </form>
      <h2>Votes</h2>
      <div className='votes'>
        {votesArr.map((candidate, idx) => {
          return (
            <div key={idx} className='votes-main'>
              <h3>Vote {idx + 1}</h3>
              <div className='vote-div'>
                <div>
                  {candidate.map((candidate, idx) => {
                    return (
                      <span key={idx}>
                        <span>{idx + 1}.</span>
                        <span>{candidate}</span>
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={showWinner}>Show the winner</button>
    </div>
  )
}

export default App
